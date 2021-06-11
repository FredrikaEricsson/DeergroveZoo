export class AnimalDetails {
  constructor(
    public id: number,
    public name: string,
    public latinName: string,
    public yearOfBirth: number,
    public longDescription: string,
    public image: string
  ) {}
}