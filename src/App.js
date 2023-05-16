import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import shaun from './media/shaun.png'

function App() {
  const [flashImg, setFlashImg] = useState(false);
  const [timeDisplayed, setTimeDisplayed] = useState(0);
  // [home, image, question, thank <3]
  const [activeScene, setActiveScene] = useState([true, false, false, false]);

  useEffect(() => {
    if (flashImg) {
      setActiveScene([false, false, false, false]);
      setTimeDisplayed(Math.random() * 1000 + 1);

      const afterEmpty1 = setTimeout(() => {
        setActiveScene([false, true, false, false]);

        const afterImage = setTimeout(() => {
          setActiveScene([false, false, false, false]);

          const afterEmpty2 = setTimeout(() => {
            setActiveScene([false, false, true, false]);
          }, 1000)
          return () => clearTimeout(afterEmpty2);

        }, timeDisplayed);
        return () => clearTimeout(afterImage);
        
      }, 1000);
      return () => clearTimeout(afterEmpty1);
    } 

  }, [flashImg]);

  function flashImage() {
    setFlashImg(true);
  }

  function sayThanks() {
    setActiveScene([false, false, false, true]);
    setFlashImg(false);
  }
  
  return (
    <>
      <ThankScreen flashImage={flashImage} activeScene={activeScene} />
      <StartScreen flashImage={flashImage} activeScene={activeScene} />
      <ImgQuestionScreen sayThanks={sayThanks} activeScene={activeScene} timeDisplayed={timeDisplayed} />
    </>
  );
}

function ThankScreen(props) {
  return (
    <div className={`media-box ${props.activeScene[3] ? 'show' : 'hide'}`}>
      <h2>Thank you for playing!</h2>
      <h2>Play Again?</h2>
      <button onClick={() => props.flashImage()}>Yes</button>
    </div>
  );
}

function ImgQuestionScreen(props) {

  function uploadResponse(ans) {
    props.sayThanks();
    alert("uploaded response")
    let data = {
      image_id: 13,
      answer: ans,
      time_displayed: props.timeDisplayed
    }
  }

  if (props.activeScene[1] && !props.activeScene[2]) {
    return (
      <img src={ shaun } alt='shaun'/>
    );
  } else if (props.activeScene[2] && !props.activeScene[1]){
    return (
      <div className="media-box">
        <h2>What did you see?</h2>
        <button onClick={() => uploadResponse("sheep")}>Sheep</button>
        <button onClick={() => uploadResponse("cow")}>Cow</button>
      </div>
    );
  }

}

function StartScreen(props) {
  return (
    <div className={`media-box ${props.activeScene[0] ? 'show' : 'hide'}`}>
      <h2>Thank you for participating</h2>
      <p>
        You will be shown an image. When prompted, choose the
        answer choice that identifies the image
      </p>
      <button onClick={() => props.flashImage()}>
        Begin
      </button>
    </div>
  );
}

export default App;
