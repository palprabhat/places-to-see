import Map from "../src/components/Map";

export const Home = () => {
  return (
    <div className="flex">
      <div className="w-1/2">Hello</div>
      <div className="w-1/2 h-full">
        <Map />
      </div>
    </div>
  );
};

export default Home;
