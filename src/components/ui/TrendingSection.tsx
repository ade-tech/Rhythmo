import { Box, Stack, Text } from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SongItem from "./SongItem";
import { useEffect, useRef, useState } from "react";

export function TrendingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);

  useEffect(() => {
    function updateScrollableStates() {
      if (!ref.current) return;

      const { scrollWidth, clientWidth, scrollLeft } = ref.current;

      if (scrollLeft > 0) {
        setCanScrollLeft(true);
      } else {
        setCanScrollLeft(false);
      }
      if (scrollLeft < scrollWidth - clientWidth) {
        setCanScrollRight(true);
      } else {
        setCanScrollRight(false);
      }
    }

    updateScrollableStates();

    ref.current?.addEventListener("scroll", updateScrollableStates);

    return () =>
      ref.current?.removeEventListener("scroll", updateScrollableStates);
  }, []);

  function moveRight(): void {
    if (ref.current) {
      ref.current.scrollBy({
        behavior: "smooth",
        left: 400,
      });
    }
  }
  function moveLeft(): void {
    if (ref.current) {
      ref.current.scrollBy({
        behavior: "smooth",
        left: -400,
      });
    }
  }
  return (
    <Stack px={6} mt={8} w={"41rem"} overflow={"auto"} position={"relative"}>
      <Text textStyle={"2xl"} fontWeight={"semibold"}>
        Trending Poems
      </Text>
      {canScrollLeft && (
        <Stack
          h={"90%"}
          bottom={0}
          w={24}
          zIndex={1}
          position={"absolute"}
          alignItems={"center"}
          justifyContent={"center"}
          bgGradient={"to-r"}
          gradientFrom={"gray.950"}
          gradientTo={"#0f0e0e00"}
        >
          <Box
            as={IoIosArrowBack}
            boxSize={8}
            p={1.5}
            border={"1px solid #4e4e4e"}
            bg={"gray.800"}
            borderRadius={"full"}
            cursor={"pointer"}
            color={"gray.400"}
            onClick={moveLeft}
          />
        </Stack>
      )}
      <Stack
        direction={"row"}
        w={"38rem"}
        overflowX={"scroll"}
        gap={1}
        position={"relative"}
        ref={ref}
      >
        <SongItem />
        <SongItem />
        <SongItem />
        <SongItem />
        <SongItem />
        <SongItem />
        <SongItem />
        <SongItem />
        <SongItem />
        <SongItem />
        <SongItem />
        <SongItem />
        <SongItem />
      </Stack>
      {canScrollRight && (
        <Stack
          h={"90%"}
          bottom={0}
          right={6}
          w={24}
          zIndex={1}
          position={"absolute"}
          alignItems={"center"}
          justifyContent={"center"}
          bgGradient={"to-l"}
          gradientFrom={"gray.950"}
          gradientTo={"#0f0e0e00"}
        >
          <Box
            as={IoIosArrowForward}
            cursor={"pointer"}
            boxSize={8}
            p={1.5}
            border={"1px solid #4e4e4e"}
            bg={"gray.800"}
            borderRadius={"full"}
            color={"gray.400"}
            onClick={moveRight}
          />
        </Stack>
      )}
    </Stack>
  );
}

export default TrendingSection;
