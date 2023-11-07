import React from 'react'
import ShowOffers from "../components/ShowOffers";

const Main = () => {
    const dummyData = [
        {
          work: "Company A",
          id: 1,
          image: "frontend/src/images/logo.png",
          position: "Software Engineer",
          uid: "user-123"
        },
        {
          work: "Company B",
          id: 2,
          image: "frontend/src/images/logo.png",
          position: "Product Manager",
          uid: "user-456"
        },
        {
          work: "Company C",
          id: 3,
          image: "frontend/src/images/logo.png",
          position: "Design Lead",
          uid: "user-789"
        },
        // ... add as many objects as needed
      ];
      
    const style = {
		maxWidth: "1200px",
		margin: "40px auto",
		display: "flex",
		justifyContent: "center",
		flexWrap: "wrap",
	};
    
  return (
    <div style={style}>
    {dummyData.map((item, index) => {
        return (
            <ShowOffers
                workplace={item.work}
                id={item.id}
                image={item.image}
                position={item.position}
                iden={item.uid}
                key={index}
            />
        );
    })}
</div>
  )
}

export default Main