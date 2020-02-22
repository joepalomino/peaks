import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useAuth0 } from "../contexts/auth0-context";
import { FETCH_ENTRIES } from "../utils/queries";
import styled from "@emotion/styled";
import tw from "tailwind.macro";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const SUBMIT_ENTRY = gql`
  mutation(
    $focusLevel: Int!
    $energyLevel: Int!
    $moodLevel: Int!
    $note: String!
    $userId: String!
  ) {
    insert_Entry(
      objects: [
        {
          user_id: $userId
          energy_level: $energyLevel
          focus_level: $focusLevel
          note: $note
          mood_level: $moodLevel
        }
      ]
    ) {
      affected_rows
      returning {
        id
        mood_level
        energy_level
        created_at
        focus_level
        note
        user_id
      }
    }
  }
`;

const Button = styled.div`
  ${tw`bg-black text-white hover:text-black py-3 px-6 inline-block rounded-md hover:bg-white border-4 hover:border-black cursor-pointer`}
  background: #E8EFF7;
box-shadow:  20px 20px 60px #c5cbd2, 
             -20px -20px 60px #ffffff;
`;

function CheckinForm(props) {
  const [focusLevel, setFocusLevel] = useState(0);
  const [energyLevel, setEnergyLevel] = useState(0);
  const [moodLevel, setMoodLevel] = useState(0);
  const [showCheckinForm, setShowCheckinForm] = useState(false);
  const [note, setNote] = useState("Add a note");
  const { user } = useAuth0();

  const [submitEntry] = useMutation(SUBMIT_ENTRY, {
    refetchQueries: () => [
      {
        query: FETCH_ENTRIES,
        variables: {
          userId: user.sub
        }
      }
    ]
  });

  let levelOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  let availableLevelInputs = [
    { name: "Focus Level", updateFn: setFocusLevel },
    { name: "Energy Level", updateFn: setEnergyLevel },
    { name: "Mood Level", updateFn: setMoodLevel }
  ];

  const handleInputChange = (val, updateFN) => e => updateFN(val);

  return (
    <div>
      <Button onClick={() => setShowCheckinForm(!showCheckinForm)}>
        Add Entry
      </Button>

      {showCheckinForm && (
        <form>
          <div>
            {availableLevelInputs.map(({ name, updateFn }, idx) => (
              <div key={idx}>
                <div>{name}</div>
                <div>
                  {levelOptions.map((unit, index) => (
                    <div
                      key={index}
                      onClick={handleInputChange(unit, updateFn)}
                    >
                      {unit}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div>
            <label>
              Note:
              <textarea value={note} onChange={e => setNote(e.target.value)} />
            </label>
          </div>
          <button
            onClick={e => {
              e.preventDefault();
              submitEntry({
                variables: {
                  focusLevel,
                  energyLevel,
                  moodLevel,
                  note,
                  userId: user.sub
                }
              }).catch(function(err) {
                console.log(err);
              });
              setShowCheckinForm(false);
              setNote("");
              setEnergyLevel(0);
              setMoodLevel(0);
              setFocusLevel(0);
            }}
          >
            submit
          </button>
        </form>
      )}
    </div>
  );
}

export default CheckinForm;
