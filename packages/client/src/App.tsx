import ReviewList from './components/reviews/ReviewList';

function App() {
   return (
      <div className="p-4 h-screen w-full">
         <ReviewList productId={4}></ReviewList>
      </div>
   );
}

export default App;
