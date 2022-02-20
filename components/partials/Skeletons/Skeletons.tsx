import React, { useEffect, useState } from "react";
import styles from "./Skeletons.module.css";
import { Skeleton } from "@mui/material";

const Skeletons: React.FC<{
  numberOfSkeleton: number;
  width1: number;
  height1: number;
  width2: number;
  height2: number;
  borderRadius1: number;
}> = ({
  numberOfSkeleton,
  width1,
  height1,
  width2,
  height2,
  borderRadius1,
}) => {
  const [noOfSkeleton, setNoOfSkeleton] = useState([]);

  useEffect(() => {
    const data = [];
    for (let i = 0; i < numberOfSkeleton; i++) {
      data.push(i);
    }
    setNoOfSkeleton(data);
  }, [numberOfSkeleton]);

  const skeletonStyle = {
    backgroundColor: "rgb(42 42 42 / 65%)",
    borderRadius: 4,
  };

  return (
    <React.Fragment>
      {noOfSkeleton.length > 0 &&
        noOfSkeleton.map(() => {
          return (
            <div className={styles.skeletonContainer}>
              <Skeleton
                variant="rectangular"
                width={width1}
                height={height1}
                style={{
                  backgroundColor: "rgb(42 42 42 / 65%)",
                  borderRadius: borderRadius1,
                }}
              />
              <Skeleton
                variant="rectangular"
                width={width2}
                height={height2}
                style={skeletonStyle}
              />
            </div>
          );
        })}
    </React.Fragment>
  );
};

export default Skeletons;
