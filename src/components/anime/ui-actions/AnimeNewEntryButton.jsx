import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';

function AnimeNewEntryButton() {
  let history = useHistory();

  return (
    <div
      className="btn btn-dark custom-type-action"
      onClick={() => history.push('/status/add')}
    >
      <AiOutlinePlus />
    </div>
  );
}

export default AnimeNewEntryButton;
