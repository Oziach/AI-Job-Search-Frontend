import React, { useEffect, useState } from 'react'
import ResultBar from './ResultBar'
import dropdown_icon from '../assets/dropdown_icon.png'
import axios from 'axios'

const Results = ({page, setPage, totalPages, userInput, results, setResults}) => {

    useEffect(()=>{
        fetchBooks();
    },[page])

    const capitalizeFirstLetter = (str) => {
        return str.substring(0, 1).toUpperCase() + str.substring(1);
      };

    const fetchBooks = async () => {
        try{
          const response = await axios.post("https://synopsis-book-search.onrender.com/search", {query: userInput, page_number: page})
          console.log(response.data.results)
          setResults(response.data.results.results)
        } catch (error){
          console.error("Error fetching books ", error);
        }
      }

    const NextPage = () => {if(page < totalPages){setPage(page+1)} else {setPage(totalPages)}}
    const PrevPage = () => {if(page > 1){setPage(page-1)} else {setPage(1)}}
    const LastPage = () => {setPage(totalPages)}
    const FirstPage = () => {setPage(1)}


    return (
        <div className='flex flex-col items-center'>
            <div className='flex justify-center items-center mt-4 gap-2 mb-4'>
                <div className='h-[1px] w-24 bg-yellow-500 mt-1' />
                <p>Results</p>
                <div className='h-[1px] w-24 bg-yellow-500 mt-1' />
            </div>
            
            {results.map((result, ind)=>{
                var summary = capitalizeFirstLetter(result.summary.trim())
                return(
                <ResultBar index={(page-1)*10 + ind+1} book_name={result.book_name} summary={summary}/>
            )})}

            {results.length > 0 && <div className='flex font-light items-center justify-center gap-3'>
                <div className='hover:cursor-pointer flex' onClick={FirstPage}>
                    <img className='rotate-180 w-2 brightness-70' src={dropdown_icon}/>
                    <img className='rotate-180 w-2 brightness-70' src={dropdown_icon}/>
                </div>
                
                <div className='hover:cursor-pointer' onClick={PrevPage}><img className='rotate-180 w-2 brightness-70' src={dropdown_icon}/></div>


                <div className='flex flex-col'>
                    <div>{page}/{totalPages}</div>
                    <div className='text-xs'>Page</div>
                </div>
                
                <div className='hover:cursor-pointer' onClick={NextPage}><img className='w-2 brightness-70' src={dropdown_icon}/></div>

                <div className='hover:cursor-pointer flex' onClick={LastPage}>
                    <img className=' w-2 brightness-70' src={dropdown_icon}/>
                    <img className=' w-2 brightness-70' src={dropdown_icon}/>
                </div>
            </div>}
        </div>
    )
}

export default Results