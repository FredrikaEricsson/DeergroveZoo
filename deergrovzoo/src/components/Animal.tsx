import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { AnimalDetails } from "../models/AnimalDetails";

interface IParams {
  animalId: string;
}

export const Animal = () => {
  let { animalId } = useParams<IParams>();
  let Animal: AnimalDetails = {
    id: 0,
    name: "",
    latinName: "",
    yearOfBirth: 0,
    longDescription: "",
    imageUrl: "",
    medicine: "",
    isFed: false,
    lastFed: "",
  };
  const [animal, setAnimal] = useState(Animal);

  useEffect(() => {
    let animals = JSON.parse(localStorage.getItem("storedAnimals") || "[]");
    let animal = animals.find(
      (a: AnimalDetails) => a.id === JSON.parse(animalId)
    );
    setAnimal(animal);
  }, [animalId]);

  return <h3>{animal.name}</h3>;
};
