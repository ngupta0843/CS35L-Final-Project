const { exec } = require("child_process");

const callgpt = (req, res) => {
    const { indata, type } = req.body;

    // Validate inputs
    if (!indata || !type) {
        return res.status(400).send({ error: "Missing required query parameters: indata and type" });
    }

    // Validate type value
    if (type !== 'd' && type !== 'w') {
        return res.status(400).send({ error: "Invalid 'type' value. It must be 'd' or 'w'." });
    }

    // Run the shell command to activate the virtual environment and run the Python script
    const command = `python3 ML/parallelized_gpt.py \"${indata}\" ${type}`;

    exec(command, (error, stdout, stderr) => {
        //making sure that if there's a warning, it will still return the result
        if (!stdout) { 
            if (error) {
                console.error(`Error executing command: ${error}`);
                return res.status(500).send({ error: error.message });
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return res.status(500).send({ error: stderr });
            }
        }
        res.status(200).json({ result: stdout.trim() });
    });
};

module.exports = { callgpt };
