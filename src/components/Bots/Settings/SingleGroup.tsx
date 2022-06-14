import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Input,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import {
  BsCheck,
  BsPauseBtnFill,
  BsPauseCircleFill,
  BsPlayCircleFill,
} from "react-icons/bs";
import { ImCross } from "react-icons/im";
import {
  ContextInterface,
  ParentContext,
} from "../../../context/ContextProvider";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
function SingleGroup(props: any) {
  const { bots } = useContext<ContextInterface>(ParentContext);
  const [loading, setLoading] = useState<boolean>(false);
  let group = props.group;
  let id = props.id;
  let checkBoxes = props.checkBoxes;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [options, setOptions] = useState<string[]>([]);
  const handleAddOptions = (option: string) => {
    if (!options.includes(option)) {
      setOptions(() => [...options, option]);
    } else {
      setOptions(() => options.filter((o) => o !== option));
    }
  };
  let cBoxes: string[] = [];
  const [checkedBoxes, setCheckedBoxes] = useState<string[]>(cBoxes);
  let extentionsArray = [
    ".txt",
    ".pdf",
    ".png",
    ".jpg",
    ".mp3",
    ".mp4",
    ".wav",
  ];
  let checkBoxArray = [
    { name: "All", exts: extentionsArray },
    { name: "Text", exts: [".txt"] },
    { name: "Pictures", exts: [".png", ".jpg"] },
    { name: "Videos", exts: [".mp4"] },
    { name: "Audios", exts: [".wav", ".mp3"] },
    { name: "Files", exts: [".pdf", "."] },
  ];
  const [sliderVal, setSliderVal] = useState(0);
  const handleCahngeFileSize = (val: number) => {
    setSliderVal(val);
  };
  const [downloadAlert, setDownloadAlert] = useState<boolean>(false);
  const handleAddCheckBox = (it: string) => {
    console.log(it);
    switch (it) {
      case "All":
        if (options.length === extentionsArray.length) {
          setCheckedBoxes(() => []);
          setOptions([]);
        } else {
          setCheckedBoxes(() => [...checkedBoxes, "All"]);
          setOptions(extentionsArray);
        }
        break;
      case "Text":
        if (options.includes(".txt")) {
          setOptions(() => options.filter((i) => i !== ".txt"));
          setCheckedBoxes(() => checkedBoxes.filter((i) => i !== "Text"));
        } else {
          setCheckedBoxes(() => [...checkedBoxes, "Text"]);
          setOptions(() => [...options, ".txt"]);
        }
        break;
      case "Pictures":
        if (options.includes(".png") || options.includes(".jpg")) {
          setOptions(() => options.filter((i) => i !== ".jpg"));
          setOptions(() => options.filter((i) => i !== ".png"));
          setCheckedBoxes(() => checkedBoxes.filter((i) => i !== "Pictures"));
        } else {
          setOptions(() => [...options, ".png", ".jpg"]);
          setCheckedBoxes(() => [...checkedBoxes, "Pictures"]);
        }
        break;
      case "Videos":
        if (options.includes(".mp4")) {
          setOptions(() => options.filter((i) => i !== ".mp4"));
          setCheckedBoxes(() => options.filter((i) => i !== "Videos"));
        } else {
          setOptions(() => [...options, ".mp4"]);
          setCheckedBoxes(() => [...checkedBoxes, "Videos"]);
        }
        break;
      case "Audios":
        if (options.includes(".mp3") || options.includes(".wav")) {
          setOptions(() => options.filter((i) => i !== ".mp3"));
          setOptions(() => options.filter((i) => i !== ".wav"));
          setCheckedBoxes(() => checkedBoxes.filter((i) => i !== "Audios"));
        } else {
          setOptions(() => [...options, ".mp3", ".wav"]);
          setCheckedBoxes(() => [...checkedBoxes, "Audios"]);
        }
        break;
      case "Files":
        if (options.includes(".pdf") || options.includes(".")) {
          setOptions(() => options.filter((i) => i !== ".pdf"));
          setOptions(() => options.filter((i) => i !== "."));
          setCheckedBoxes(() => checkedBoxes.filter((i) => i !== "Files"));
        } else {
          setOptions(() => [...options, ".pdf", "."]);
          setCheckedBoxes(() => [...checkedBoxes, "Files"]);
        }
        break;
      default:
        setOptions([]);
    }
  };

  useEffect(() => {
    if (checkBoxes[`${group.id}`]) {
      let c: any = checkBoxes[`${group.id}`];

      console.log("------c------", c, group.id, checkBoxes[`${group.id}`]);
      // }
      // if (group.hasOwnProperty("c")) {
      setOptions(c);
      if (c.includes(".png") && c.includes(".jpg")) {
        setCheckedBoxes([...checkedBoxes, "Pictures"]);
        cBoxes.push("Pictures");
      }
      if (c.includes(".txt")) {
        setCheckedBoxes([...checkedBoxes, "Text"]);
        cBoxes.push("Text");
      }
      if (c.includes(".mp4")) {
        setCheckedBoxes([...checkedBoxes, "Videos"]);
        cBoxes.push("Videos");
      }
      if (c.includes(".mp3") && c.includes(".wav")) {
        setCheckedBoxes([...checkedBoxes, "Audios"]);
        cBoxes.push("Audios");
      }
      if (c.includes(".pdf")) {
        setCheckedBoxes([...checkedBoxes, "Files"]);
        cBoxes.push("Files");
      }
      if (c.length === extentionsArray.length) {
        setCheckedBoxes([...checkedBoxes, "All"]);
        cBoxes.push("All");
      }
    }
  }, []);

  useEffect(() => {
    // alert(options.length);
    async function saveCheckboxes() {
      const uOptions = Array.from(new Set(options));
      let res = await bots.saveCheckboxes({ options: uOptions, group }, id);
    }
    saveCheckboxes();
  }, [options.length]);

  const toast = useToast();
  const handleDownload = async () => {
    const uOptions = Array.from(new Set(options));
    if (!uOptions.length) {
      toast({
        title: "Error",
        description: "Select Atleast one extention!",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });

      return;
    }
    setLoading(true);
    let res = await bots.downloadData(
      { options: uOptions, group, size: sliderVal },
      id
    );
    console.log("res", res);
    if (!res.success) {
      toast({
        title: "Error",
        description: res.msg,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
    }
    onClose();
    setLoading(false);
  };
  return (
    <Box py="4">
      <Flex justify={"flex-end"} alignItems={"center"}>
        {/* <Flex flex="1" opacity={"0.5"}>
          <ImCross color="" />
        </Flex> */}
        <Text flex="3" fontWeight={"bold"} fontSize={18}>
          {group.name}
        </Text>
        <Flex
          rounded={30}
          flex="1"
          justifyContent={"center"}
          onClick={() => setDownloadAlert(true)}
          cursor="pointer"
          // pointerEvents={loading ? "none" : "all"}
        >
          <BsPlayCircleFill size="20" />
        </Flex>
        {checkBoxArray.map((it) => (
          <Checkbox
            justifyContent="center"
            onChange={() => {
              handleAddCheckBox(it.name);
            }}
            flex="1"
            value={it.name}
            isChecked={checkedBoxes.includes(it.name)}
          />
        ))}
        <Box flex="1">
          <Select
            onClickCapture={(e: any) => {
              e.preventDefault();
            }}
          >
            {extentionsArray.map((o) => (
              <option
                value={o}
                onClick={() => {
                  handleAddOptions(o);
                }}
              >
                {o} {options.includes(o) ? "✔" : ""}
              </option>
            ))}
            {/* <option value=".pdf">.pdf ✔</option>
            <option value=".png">.png</option>
            <option value=".jpg">.jpg</option>
          <option value=".mp3">.mp3</option> */}
          </Select>
        </Box>
      </Flex>
      {downloadAlert && (
        <Modal isOpen={true} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Download</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Choose File Size</Text>
              <Slider
                onChange={handleCahngeFileSize}
                aria-label="slider-ex-1"
                value={sliderVal}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              <Text>Size in MB: {sliderVal}</Text>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => setDownloadAlert(false)}
              >
                Close
              </Button>
              <Button variant="ghost" onClick={handleDownload}>
                Download
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
}

export default SingleGroup;
