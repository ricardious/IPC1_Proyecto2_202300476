class Post {
    constructor(id, name, userId, description, image) {
        this.id = id;
        this.name = name;
        this.userId = userId;
        this.description = description;
        this.image = image;
        this.date = new Date();
    }
}

export {Post}
