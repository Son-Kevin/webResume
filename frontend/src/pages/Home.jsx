import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

export const Home = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/exercises')
      .then((response) => {
        setExercises(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Exercise List</h1>
        <Link to='/exercises/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full border-seperate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded md'>No</th>
              <th className='border border-slate-600 rounded md'>Exercise</th>
              <th className='border border-slate-600 rounded md max-md:hidden'>
                Weight
              </th>
              <th className='border border-slate-600 rounded md max-md:hidden'>
                Number Of Sets
              </th>
              <th className='border border-slate-600 rounded md max-md:hidden'>
                Number Of Reps
              </th>
              <th className='border border-slate-600 rounded-md'>Operations</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((exercise, index) => (
              <tr key={exercise._id} className='h-8'>
                <td className='border border-slate-700 rounded-md text-center'>
                  {index + 1}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {exercise.Exercise}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {exercise.Weight}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {exercise.NumOfSet}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {exercise.NumOfRep}
                </td>
                <td className='flex justify-center gap-x-4'>
                  <Link to={`/exercises/details/${exercise._id}`}>
                    <BsInfoCircle className='text-2x1 text-green-800' />
                  </Link>
                  <Link to={`/exercises/edit${exercise._id}`}>
                    <AiOutlineEdit className='text-2x1 text-yellow-600' />
                  </Link>
                  <Link to={`/exercises/delete${exercise._id}`}>
                    <MdOutlineDelete className='text-2x1 text-red-600' />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
