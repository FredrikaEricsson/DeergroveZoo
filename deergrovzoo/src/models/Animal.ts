export class Animal {
  constructor(
    public id: number,
    public name: string,
    public shortDescription: string,
    public imageUrl: string,
    public isFed: boolean,
    public lastFed: string
  ) {}
}
