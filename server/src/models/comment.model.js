class Comment {
    constructor(id, postId, user, text) {
        this.id = id;
        this.postId = postId;
        this.user = user;             // código USAC del autor (no anónimo)
        this.text = text;
        this.date = new Date();
    }
}

export {Comment}
