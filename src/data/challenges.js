export const challenges = [
  {
    id: 1,
    name: "Challenge 1",
    difficulty: "Easy",
    points: 10,
    question: "Gur svefg ongpu bs gur qrcnegzrag jnf fgnegrq",
    hint: "ROT + Department Year",
    answer: "CCE{2019}", // Evaluated logic: ROT13: The first batch of the department was started -> 2019
  },
  {
    id: 2,
    name: "Challenge 2",
    difficulty: "Easy",
    points: 10,
    question: "SGVhZCBvZiB0aGUgZGVwYXJ0bWVudCA=",
    hint: "Faculty Clue. Encoded string.",
    answer: "CCE{Dr_C_Vivek}", // Evaluated logic: Base64 decode: Head of the department -> Dr_C_Vivek
  },
  {
    id: 3,
    name: "Challenge 3",
    difficulty: "Medium",
    points: 20,
    question: "This lab runs on powerful CPU systems and is the hub for Cybersecurity and High Performance Computing. What is its name?",
    hint: "Lab Puzzle",
    answer: "CCE{Cybersecurity_Hypernet_Lab}",
  },
  {
    id: 4,
    name: "Story Mode",
    difficulty: "Medium",
    points: 20,
    question: "\"Our department systems have been locked.\\nA mysterious code was found in the server logs:\"\\nU2FsdGVkX19kZXB0we_are_the_department}\\n\\nOnly true students of this department can recover the final key.\\nDecode the message and uncover the identity.\\nSubmit the flag in format: CCE{we_are_the_department}",
    hint: "Story Mode: Base64 decoding might help uncover the hidden string.",
    answer: "CCE{we_are_the_department}",
  },
  {
    id: 5,
    name: "Achievements",
    difficulty: "Hard",
    points: 30,
    question: "This achievement represents innovation and excellence.\\nClues:\\n- Won in the year: 2025\\n- Event name starts with 'I'\\n- Focuses on technical creativity\\nWhat is the event?",
    hint: "Check department achievements or seniors' milestones.",
    answer: "CCE{Ingenium_2025}",
  }
];
