module.exports = (msg, title) => {
    if (!title) title = "Log";
    if (title == "Error") {
        console.error(`[${title}] ${msg}`);
    } else console.log(`[${title}] ${msg}`);
};