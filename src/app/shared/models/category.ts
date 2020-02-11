export class Category {
    public catName: string;
    public catId: number;

    public setCatName(categoryName: string) {
        this.catName = categoryName;
    }
    public getCatName(): string {
        return this.catName;
    }
}
