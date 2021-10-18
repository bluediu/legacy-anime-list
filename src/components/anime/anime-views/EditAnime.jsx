import React, { useEffect, useRef, useState } from 'react';

import advancedFormat from 'dayjs/plugin/advancedFormat';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { useDispatch, useSelector } from 'react-redux';

import {
  activeEntry,
  startDeleteEntry,
  startUpdateEntry,
} from '../../../context/actions/entries';

import { useHistory } from 'react-router-dom';
import { useForm } from '../../../hooks/useForm';

/* components and lib */
import AnimeActionNav from '../navbar/AnimeActionNav';
import AnimeDeleteEntryButton from '../ui-actions/AnimeDeleteEntryButton';
import AnimePhoto from '../ui-actions/AnimePhoto';
import AnimeUpdateEntryButton from '../ui-actions/AnimeUpdateEntryButton';
import Clipboard from '../../utils/Clipboard';
import EditAnimeForm from '../forms/EditAnimeForm';
import AnimeDate from '../ui-views/AnimeDate';
import AnimeCheckedInput from '../ui-actions/AnimeCheckedInput';

dayjs.locale('es');

function EditAnime() {
  const dispatch = useDispatch();
  const { active: anime } = useSelector(
    (state) => state.entries
  );
  const { form, handleChange, reset } = useForm(anime);

  const [updateImg, setUpdateImg] = useState(anime?.img || '');

  const activeId = useRef(anime.id);
  let history = useHistory();

  // state that handle if checkbox is checked
  const [checked, setChecked] = useState(false);
  const [isValidEntry, setIsValidEntry] = useState(true);

  // config for dayjs library
  dayjs.extend(advancedFormat);
  const animeDate = dayjs(form.date);

  // reset form when the id change
  useEffect(() => {
    if (anime.id !== activeId.current) {
      reset(anime);
      activeId.current = anime.id;
    }
  }, [anime, reset]);

  useEffect(() => {
    dispatch(activeEntry(form.id, { ...form }));
  }, [form, dispatch]);

  // recibe the db value and assings the state for handle input checked,
  // when the component is rendering
  useEffect(() => {
    setChecked(form.completed);
  }, [form.completed]);

  // delete a anime
  const handleDelete = () => {
    dispatch(startDeleteEntry(form.id, form.title));
    history.push('/');
  };

  // catch the value of the input checkbox
  const handleChecked = (e) => setChecked(e.target.checked);

  // update selected anime
  const handleUpdate = () => {
    /*
     delete prop "completed" of form, because the value not change when is clicked,
     the value change in the state (check) when is clicked in the input check
    */
    let formData = { ...form, img: updateImg };
    delete formData.completed;

    const animeUpdateData = {
      ...formData,
      completed: checked, // the state value to completed update
    };

    dispatch(startUpdateEntry(animeUpdateData));
    history.push('/');
  };

  // previous reference of the image
  const previousImgValue = useRef(updateImg);

  /* check if the image has been modified against the previous one(previous ImgValue) */
  useEffect(() => {
    previousImgValue.current === updateImg
      ? setIsValidEntry(true)
      : setIsValidEntry(false);
  }, [updateImg]);

  // previous reference of the checked value
  const previousCheckedValue = useRef(anime.completed);

  /* check if the (check) state has been changed */
  useEffect(() => {
    previousCheckedValue.current === checked
      ? setIsValidEntry(true)
      : setIsValidEntry(false);
  }, [checked]);

  /* verify if the form value is not null */
  const handleValidEntryObserver = () => {
    form.title ? setIsValidEntry(false) : setIsValidEntry(true);
  };

  return (
    <main>
      <AnimeActionNav title="Editar" />

      <AnimePhoto
        image={updateImg}
        title={form.title}
        setUpdateImg={setUpdateImg}
        typeAction="update"
      />

      <section className="container">
        <article className="container animate__animated animate__fadeIn animate__faster">
          <section className="small-phone-height">
            <EditAnimeForm
              handleValidEntryObserver={handleValidEntryObserver}
              title={form?.title}
              handleChange={handleChange}
            />

            <Clipboard title={form.title} />
          </section>
        </article>

        <AnimeDate animeDate={animeDate} />

        <AnimeCheckedInput
          handleChecked={handleChecked}
          checked={checked}
        />
      </section>

      <AnimeDeleteEntryButton handleDelete={handleDelete} />

      <AnimeUpdateEntryButton
        handleUpdate={handleUpdate}
        isValidEntry={isValidEntry}
      />
    </main>
  );
}

export default EditAnime;
