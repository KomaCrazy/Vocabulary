'use client';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

import {
  orderBy,
  collection,
  addDoc,
  getDoc,
  querySnapshot,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import CountUp from 'react-countup';
import { db } from '@/app/initFirebase';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCircleCheck
} from "@fortawesome/free-solid-svg-icons";

import SweetAlert from '@/lib/sweet_alert';

export default function Home() {

  const [items, setItems] = useState([]);
  let word_current = items.length
  let word_target = 3000

  useEffect(() => {
    const q = query(collection(db, 'vocabulary'), orderBy('id', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });

      setItems(itemsArr);
    });
  }, []);
  const deleteItem = async (id = 0) => {
    SweetAlert(`Delete success`,0)
    await deleteDoc(doc(db, 'vocabulary', id));
  };

  const [newItem, setNewItem] = useState({ en: '', th: '' });
  const addItem = async (e) => {
    SweetAlert(`Add success`,1)
    e.preventDefault();
    if (newItem.en !== '' && newItem.th !== '') {
      await addDoc(collection(db, 'vocabulary'), {
        en: newItem.en.trim(),
        th: newItem.th.trim(),
        id:word_current
      });
      setNewItem({ en: '', th: '' });
    }
  };
  const propertyNames = ['en', 'th'];

  return (
    <main className='vocabulary'>
      <div>
        <h1>Vocabulary</h1>      
        <div>
          <span><CountUp start={word_current} end={word_current} duration={10}/>/ {word_target} Word</span>
        </div>
      </div>
      <li>
        <div className='group-list'>
          {propertyNames.map((property, index) => (
            <span key={index} className={`item item-${index + 1}`}>
              <input
                value={newItem[property]}
                onChange={(e) => setNewItem({ ...newItem, [property]: e.target.value })}
                className='col-span-3 p-3 border'
                type='text'
                placeholder={`Enter ${property === 'en' ? 'English' : 'Thai'}`}
              />
            </span>
          ))}
          <span className='action-add'>
            <Button onClick={(e) => addItem(e)} color='success' variant="contained">
              <FontAwesomeIcon icon={faCircleCheck} fontSize={16} />
              </Button>
          </span>
          </div>
      </li>
    {items.map((item, id) => (
      <li key={id} className=''>
        <div className='group-list'>
          {propertyNames.map((property, index) => (
            <span className='item item-1'>{item[property]}</span>
          ))}
            <span className='action-del'>
            <Button onClick={()=>deleteItem(item.id)} color='error' variant="contained">
              <FontAwesomeIcon icon={faTrash} fontSize={16}/>
            </Button>
            </span>
        </div>
      </li>
    ))}
    </main>
  );
}
