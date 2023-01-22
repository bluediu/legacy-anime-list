import React, { useState } from 'react';
import { useForm } from '../../../hooks/useForm';
import { useDispatch } from 'react-redux';

/* components and libs */
import { startNewEntry } from '../../../context/actions/entries';
import { Link } from 'react-router-dom';

/* components */
import { AnimeActionNav } from '../Navbar/';
import { AddNewAnimeForm } from '../Forms/';
import {AnimePhoto} from '../AnimeActions/';
import { GoCheck } from 'react-icons/go';

const initialState = {
  addNew: '',
};

function AddNewAnime() {
  const dispatch = useDispatch();
  const [isValidEntry, setIsValidEntry] = useState(true);
  const [addImage, setAddImage] = useState('');

  const { form, handleChange, handleSubmit } =
    useForm(initialState);

  const handleNewAnime = () => {
    const newNote = {
      title: form.addNew,
      completed: false,
      img: addImage,
      date: new Date().getTime(),
    };

    dispatch(startNewEntry(newNote));
  };

  const handleValidEntryObserver = () => {
    form.addNew ? setIsValidEntry(false) : setIsValidEntry(true);
  };

  return (
    <>
      <AnimeActionNav title="Nuevo anime" />

      <AnimePhoto
        image={addImage}
        title={form.addNew}
        typeAction="new"
        setAddImage={setAddImage}
      />

      <div className="container animate__animated animate__fadeIn animate__faster">
        <AddNewAnimeForm
          handleValidEntryObserver={handleValidEntryObserver}
          handleSubmit={handleSubmit}
          addNew={form.addNew}
          handleChange={handleChange}
        />
      </div>

      <Link
        to="/"
        onClick={handleNewAnime}
        className={`btn btn-dark custom-type-action ${
          isValidEntry && 'disabled'
        }`}
        style={{
          margin: 0,
          padding: 0,
          textDecoration: 'none',
          color: 'white',
        }}
      >
        <GoCheck />
      </Link>
    </>
  );
}

export default AddNewAnime;
