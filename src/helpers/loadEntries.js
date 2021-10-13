import { db } from '../services/firebase-config';

export const loadEntries = async (uid) => {
  const entriesSnap = await db
    .collection(`${uid}/animelist/entries`)
    .get();

  const entries = [];

  entriesSnap.forEach((entry) => {
    entries.push({
      id: entry.id,
      ...entry.data(),
    });
  });

  return entries;
};
