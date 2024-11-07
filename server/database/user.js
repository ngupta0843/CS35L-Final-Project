import client from './client';

async function createUser(client, { username, password, bio, profileimage }) {
    const result = await client.db("users").collection("users").insertOne({
        username,
        password,
        bio,
        profileimage,
        following: [],
        followers: [],
    });
    console.log('New user created with the following id:', result.insertedId);
}