'use client';
import sweetAlert from '@/lib/sweet_alert'


export default function Home(){
  const test = () => {
    sweetAlert("",1,20000)
  }

  return (
    <>
      <button onClick={()=>test()}>OK</button>
    </>
  )

}