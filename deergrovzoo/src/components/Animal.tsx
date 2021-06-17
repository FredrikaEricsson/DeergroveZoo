import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { AnimalDetails } from "../models/AnimalDetails";
import moment from "moment";

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
    lastFed: new Date(),
  };
  const [animal, setAnimal] = useState(Animal);

  function getAnimals() {
    let animals = JSON.parse(localStorage.getItem("storedAnimals") || "[]");
    return animals;
  }

  function feedAnimal() {
    if (animal.isFed === false) {
      let fedAnimal: AnimalDetails = {
        ...animal,
        isFed: true,
        lastFed: new Date(),
      };

      setAnimal(fedAnimal);

      let animals = getAnimals();
      let index = animals.findIndex(
        (a: AnimalDetails) => a.id === JSON.parse(animalId)
      );
      animals.splice(index, 1, fedAnimal);
      localStorage.setItem("storedAnimals", JSON.stringify(animals));
    }
  }

  useEffect(() => {
    let animals = getAnimals();
    let animal = animals.find(
      (a: AnimalDetails) => a.id === JSON.parse(animalId)
    );
    animal.lastFed = new Date(animal.lastFed);
    setAnimal(animal);
  }, [animalId]);

  useEffect(() => {
    let animals = getAnimals();
    let animal = animals.find(
      (a: AnimalDetails) => a.id === JSON.parse(animalId)
    );
    let currentTime = moment();
    let lastFeedingTime = moment(animal.lastFed);
    let nextFeedingTime = moment(lastFeedingTime).add(3, "hour");

    console.log(currentTime);

    if (nextFeedingTime.isBefore(currentTime)) {
      let hungryAnimal: AnimalDetails = {
        ...animal,
        isFed: false,
        lastFed: new Date(animal.lastFed),
      };

      setAnimal(hungryAnimal);
    }
  }, []);

  return (
    <div>
      <h2>{animal.name}</h2>
      <img src={animal.imageUrl} width="300px" alt="/" />
      <ul>
        <li>Latin: {animal.latinName}</li>
        <li>Född: {animal.yearOfBirth}</li>
        <li>Medicin: {animal.medicine}</li>
        <li>
          Senast matad: {animal.lastFed.toLocaleDateString()} <span></span>
          {animal.lastFed.toLocaleTimeString()}
        </li>
        <li>{animal.isFed.toString()}</li>
      </ul>
      <button
        onClick={feedAnimal}
        disabled={animal.isFed === true ? true : false}
      >
        Mata
      </button>
    </div>
  );
};
