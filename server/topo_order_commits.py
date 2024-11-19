import sys
import os
import zlib

# in case there are deeply committed graphs
sys.setrecursionlimit(100000)  

class CommitNode:
    #this represents a commit node in the commit graph
    def __init__(self, commit_hash):
        """
        :type commit_hash: str
        """
        self.commit_hash = commit_hash
        self.parents = set()
        self.children = set()

# walk upwards the directory to find the .git directory
def find_git_dir():
    current_dir = os.getcwd()
    while True:
        git_dir = os.path.join(current_dir, '.git')
        if os.path.isdir(git_dir):
            return git_dir
        parent_dir = os.path.dirname(current_dir)
        if current_dir == parent_dir:
            # if we reach the root and there is not .git, add 1 to sys.stderr
            sys.stderr.write('Not inside a Git repository\n')
            sys.exit(1)
        current_dir = parent_dir

def get_local_branches(git_dir):
    refs_heads = os.path.join(git_dir, 'refs', 'heads')
    branches = {}
    if not os.path.exists(refs_heads):
        return branches
    for root, dirs, files in os.walk(refs_heads):
        for file in files:
            branch_path = os.path.join(root, file)
            with open(branch_path, 'r') as f:
                commit_hash = f.read().strip()
                # use relative path to get branch name
            branch_name = os.path.relpath(branch_path, refs_heads)
            branches.setdefault(commit_hash, []).append(branch_name)
    return branches

#gets parents for given commit by reading git's internal data
def get_parents(git_dir, commit_hash):
    obj_dir = os.path.join(git_dir, 'objects', commit_hash[:2])
    obj_file = os.path.join(obj_dir, commit_hash[2:])
    try:
        with open(obj_file, 'rb') as f:
            compressed_data = f.read()
    except FileNotFoundError:
        return []
    decompressed_data = zlib.decompress(compressed_data)
    header_end = decompressed_data.find(b'\x00')
    content = decompressed_data[header_end+1:]
    lines = content.split(b'\n')
    parents = []
    for line in lines:
        if line.startswith(b'parent '):
            parent_hash = line[len(b'parent '):].decode()
            parents.append(parent_hash)
        elif line == b'':
            break
    return parents

#build the commit graph by traversing the commit tree
def build_commit_graph(git_dir, branch_heads):
    commit_nodes = {}
    visited = set()
    #this is the dfs implementation
    def dfs(commit_hash):
        if commit_hash in visited:
            return
        visited.add(commit_hash)
        node = commit_nodes.get(commit_hash)
        if node is None:
            node = CommitNode(commit_hash)
            commit_nodes[commit_hash] = node
        parents = get_parents(git_dir, commit_hash)
        for parent_hash in parents:
            node.parents.add(parent_hash)
            parent_node = commit_nodes.get(parent_hash)
            if parent_node is None:
                parent_node = CommitNode(parent_hash)
                commit_nodes[parent_hash] = parent_node
            parent_node.children.add(commit_hash)
            dfs(parent_hash)

    # dfs from each branch head to capture all commits
    for commit_hash in branch_heads:
        dfs(commit_hash)
    return commit_nodes

# topological sort of the commit graph
def topo_sort(commit_nodes, branch_heads):
    visited = set()
    result = []

    # this is a helper function to visit each node in order to sort
    def visit(n):
        if n in visited:
            return
        node = commit_nodes[n]
        for parent_hash in sorted(node.parents):
            visit(parent_hash)
        visited.add(n)
        result.append(n)

    for commit_hash in sorted(branch_heads):
        visit(commit_hash)
    return result[::-1]  

# printing it with sticky ends 
def print_sticky_end(parents):
    if parents:
        parents_list = sorted(parents)
        line = ' '.join(parents_list) + '='
    else:
        line = '='
    print(line)

def print_sticky_start(children):
    line = '='
    if children:
        line += ''.join(' ' + child_hash for child_hash in sorted(children))
    print(line)

def print_topo_ordered_commits(topo_ordered_commits, commit_nodes, branches):
    for i in range(len(topo_ordered_commits)):
        commit_hash = topo_ordered_commits[i]
        node = commit_nodes[commit_hash]
        if i == 0:
            if node.children:
                print_sticky_start(node.children)
            else:
                print('=')

        # printing out the commit hash and branch name
        line = commit_hash
        if commit_hash in branches:
            branch_names = sorted(branches[commit_hash])
            line += ' ' + ' '.join(branch_names)
        print(line)

        # ensure all sticky ends are needed
        if i+1 < len(topo_ordered_commits):
            next_commit_hash = topo_ordered_commits[i+1]
            next_node = commit_nodes[next_commit_hash]
            if next_commit_hash not in node.parents:
                if node.parents:
                    print_sticky_end(node.parents)
                else:
                    print('=')
                print()
                if next_node.children:
                    print_sticky_start(next_node.children)
                else:
                    print('=')
    # the last sticky for the last commit
    last_node = commit_nodes[topo_ordered_commits[-1]]
    if last_node.parents:
        print_sticky_end(last_node.parents)

#this is the main driver function that invokes all other functions
def topo_order_commits():
    git_dir = find_git_dir()
    branches = get_local_branches(git_dir)
    branch_heads = branches.keys()
    commit_nodes = build_commit_graph(git_dir, branch_heads)
    topo_ordered_commits = topo_sort(commit_nodes, branch_heads)
    print_topo_ordered_commits(topo_ordered_commits, commit_nodes, branches)

'''Ran this command on the linux server execve("/usr/local/cs/bin/python3", ["python3", "topo_order_commits.py"], 0x7fff1b88a970 /* 46 vars */) = 0. This shows that the function invokes no external commands and only invokes functions that are mentioned within the program scope.
'''

if __name__ == '__main__':
    topo_order_commits()
