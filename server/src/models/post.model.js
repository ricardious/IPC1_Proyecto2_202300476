class Post {
    constructor(id, user, description, category, image, anonymous) {
        this.id = id;
        this.user = user;             // código USAC del autor
        this.description = description;
        this.category = category;
        this.image = image;
        this.anonymous = anonymous;
        this.date = new Date();
    }
}

export {Post}
