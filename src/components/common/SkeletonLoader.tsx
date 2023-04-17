import { Skeleton } from "@chakra-ui/react";

interface SkeletonLoaderProps {
  count: number;
  height: string;
  width?: string;
}
export const SkeletonLoader = ({
  count,
  height,
  width,
}: SkeletonLoaderProps) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <Skeleton
          startColor="blackAlpha.400"
          endColor="whitealpha.300"
          height={height}
          width={{ base: "full" }}
          borderRadius={4}
          key={index}
        />
      ))}
    </>
  );
};
