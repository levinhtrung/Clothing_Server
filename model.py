# import cv2
# import sys
import sys

# sys.path.insert(0, '/path/to/torch/lib/python3.8/site-packages')
import torch
import cv2

modelBMI = torch.hub.load("ultralytics/yolov5", "custom", path="Model_BMINew.pt")
modelAge = torch.hub.load("ultralytics/yolov5", "custom", path="Model_AgeNew.pt")
modelGender = torch.hub.load("ultralytics/yolov5", "custom", path="Model_GenderNew.pt")


def yoloGender(img_path):
    img = cv2.imread(img_path)
    resultsGender = modelGender(img)

    label = str(str(resultsGender.pandas().xyxy).split(" ")[-1]).split("]")[0]
    return label


def yoloAge(img_path):
    img = cv2.imread(img_path)
    resultsAge = modelAge(img)

    label = str(str(resultsAge.pandas().xyxy).split(" ")[-1]).split("]")[0]
    return label


def yoloBMI(img_path):
    img = cv2.imread(img_path)
    resultsBMI = modelBMI(img)

    labelOm = str(str(resultsBMI.pandas().xyxy)).find("Om")
    labelBT = str(str(resultsBMI.pandas().xyxy)).find("Binh thuong")
    labelBeo = str(str(resultsBMI.pandas().xyxy)).find("Beo")
    if labelOm != -1:
        return "Om"
    elif labelBT != -1:
        return "thuong"
    elif labelBeo != -1:
        return "Beo"


if __name__ == "__main__":
    print(yoloGender(sys.argv[1]))
    print(yoloAge(sys.argv[1]))
    print(yoloBMI(sys.argv[1]))
