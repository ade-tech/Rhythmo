import { Box, Button, Dialog, Portal, Text } from "@chakra-ui/react";

interface createButtonProps {
  title: string;
  description: string;
  icon: React.ElementType;
}
const CreateMusicDialog = ({ title, icon, description }: createButtonProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          flexBasis={"1/2"}
          m={0}
          w={"full"}
          h={"full"}
          rounded={"lg"}
          variant={"outline"}
          textStyle={"4xl"}
          color={"gray.400"}
          borderColor={"gray.800"}
          _hover={{
            borderColor: "green.800",
            bg: "green.800/10",
            color: "green.50",
          }}
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          pb={4}
          justifyContent={"center"}
        >
          <Box as={icon} boxSize={14} />
          <Text>{title}</Text>
          <Text textStyle={"sm"} w={"3/4"} textWrap={"wrap"} color={"gray.600"}>
            {description}
          </Text>
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Dialog Title</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button>Save</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
export default CreateMusicDialog;
