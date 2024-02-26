import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const names = [
  "Sophia",
  "Jackson",
  "Olivia",
  "Liam",
  "Emma",
  "Noah",
  "Ava",
  "Lucas",
  "Isabella",
  "Oliver",
  "Mia",
  "Ethan",
  "Amelia",
  "Aiden",
  "Harper",
  "Elijah",
  "Evelyn",
  "James",
  "Charlotte",
  "Benjamin",
  "Abigail",
  "William",
  "Emily",
  "Alexander",
  "Madison",
  "Michael",
  "Elizabeth",
  "Mason",
  "Sofia",
  "Logan",
  "Avery",
  "Matthew",
  "Ella",
  "Daniel",
  "Scarlett",
  "Henry",
  "Grace",
  "Joseph",
  "Lily",
  "Samuel",
  "Chloe",
  "David",
  "Victoria",
  "Carter",
  "Riley",
  "Wyatt",
  "Aria",
  "Jayden",
  "Zoey",
  "Gabriel",
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;

  @media (min-width: 600px) {
    padding: 50px;
  }
`;

const NameCard = styled(motion.div)`
  font-size: 24px;
  padding: 20px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  width: 100%;

  @media (min-width: 600px) {
    width: 50%;
  }

  /* Framer Motion animation */
  initial={{ opacity: 0, x: "-100%" }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: "100%" }}
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

const ListContainer = styled.div`
  width: 100%;

  @media (min-width: 600px) {
    display: flex;
    justify-content: space-between;
  }
`;

const SelectedNamesList = styled.div`
  width: 100%;

  @media (min-width: 600px) {
    width: 48%;
  }
`;

const RejectedNamesList = styled.div`
  width: 100%;

  @media (min-width: 600px) {
    width: 48%;
  }
`;

export default function App() {
  const [currentNameIndex, setCurrentNameIndex] = useState(0);
  const [selectedNames, setSelectedNames] = useState([]);
  const [rejectedNames, setRejectedNames] = useState([]);
  const [filteredNames, setFilteredNames] = useState(names);

  useEffect(() => {
    if (currentNameIndex >= filteredNames.length) {
      setCurrentNameIndex(0);
    }
  }, [currentNameIndex, filteredNames]);

  const handleResponse = (response) => {
    if (response === "Yes") {
      setSelectedNames([...selectedNames, filteredNames[currentNameIndex]]);
      const updatedNames = filteredNames.filter(
        (_, index) => index !== currentNameIndex
      );
      setFilteredNames(updatedNames);
    } else if (response === "Maybe") {
      setCurrentNameIndex(currentNameIndex + 1);
    } else if (response === "No") {
      const updatedNames = filteredNames.filter(
        (name, index) => index !== currentNameIndex
      );
      setRejectedNames([...rejectedNames, filteredNames[currentNameIndex]]);
      setFilteredNames(updatedNames);
    }

    // Increment the index for "Yes" and "Maybe"
    setCurrentNameIndex(currentNameIndex + 1);
  };

  return (
    <Container>
      {currentNameIndex < names.length && (
        <NameCard
          key={currentNameIndex} // Add a key to force re-render on state change
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
        >
          {names[currentNameIndex]}
        </NameCard>
      )}

      <ButtonContainer>
        <button onClick={() => handleResponse("Yes")}>Yes</button>
        <button onClick={() => handleResponse("No")}>No</button>
        <button onClick={() => handleResponse("Maybe")}>Maybe</button>
      </ButtonContainer>

      <div>
        <h2>Selected Names:</h2>
        <ul>
          {selectedNames.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
        <h2>Rejected Names:</h2>
        <ul>
          {rejectedNames.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      </div>
    </Container>
  );
}