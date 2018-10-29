module.exports = (msg, title) => {

    //if theres no title use Log as title
    if (!title) title = "Log";

    //if the title is Error log it as a Error and stringyfy it
    if (title === "Error") {
        return console.error(`[${title}] ${JSON.stringify(msg, Object.getOwnPropertyNames(msg))}`);

        //else just log it with the given message and title
    } else {
        console.log(`[${title}] ${msg}`);
    };
};