import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SongItem, { SongItemPreLoader } from "./SongItem";
import { useEffect, useRef, useState } from "react";
import { useIsSongOpen } from "@/contexts/songContext";
import { Song } from "@/features/tracks/songType";

type trendingSectionProps = {
  data: Song[] | undefined;
  isLoading: boolean;
  title: string;
};

export function TrendingSection({
  data,
  title,
  isLoading,
}: trendingSectionProps) {
  const { isOpen } = useIsSongOpen();
  const ref = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false);
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
  }, [data]);

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

  if (isLoading)
    return (
      <Stack w={"full"} px={6} mt={8}>
        <Box
          w={"1/4"}
          h={"2rem"}
          animation={"pulse"}
          bg={"gray.800"}
          mb={2}
          rounded={"md"}
        />
        <HStack
          w={isOpen ? "37rem" : "60rem"}
          h={"fit"}
          overflowX={"auto"}
          gap={1}
          display={"flex"}
          whiteSpace={"nowrap"}
          position={"relative"}
          ref={ref}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <SongItemPreLoader key={i} isOpen={isOpen} />
          ))}
        </HStack>
      </Stack>
    );

  return (
    <Stack
      px={6}
      mt={8}
      w={"full"}
      whiteSpace={"nowrap"}
      overflow={"auto"}
      position={"relative"}
      scrollbar={"hidden"}
      className="rhythmo-section-trending"
    >
      <Text textStyle={"2xl"} fontWeight={"semibold"}>
        {title}
      </Text>
      {canScrollLeft && !isLoading && (
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
      <HStack
        w={isOpen ? "37rem" : "60rem"}
        h={"fit"}
        overflowX={"scroll"}
        gap={1}
        display={"flex"}
        whiteSpace={"nowrap"}
        position={"relative"}
        ref={ref}
      >
        {data?.map((song) => (
          <SongItem key={song.id} data={song} isOpen={isOpen} />
        ))}
      </HStack>
      {canScrollRight && !isLoading && (
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
