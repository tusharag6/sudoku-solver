import Solve_Engine
from Utility_Func import *
import os
print("setting up")
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'


heightImg = 450
widthImg = 450
model = intializePredectionModel()

# Prepare the Image
img = cv2.imread("images/img_1.webp")
img = cv2.resize(img, (widthImg, heightImg))
imgBlank = np.zeros((heightImg, widthImg, 3), np.uint8)
imgThreshold = preProcess(img)

# Find Contours
imgContours = img.copy()
imgBigContour = img.copy()
contours, hierarchy = cv2.findContours(
    imgThreshold, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
cv2.drawContours(imgContours, contours, -1, (0, 0, 255), 3)

# Find the biggest Contour
biggest, maxArea = biggestContour(contours)
# # print(biggest)
if biggest.size != 0:
    biggest = reorder(biggest)
#     # print(biggest)
    cv2.drawContours(imgBigContour, biggest, -1, (0, 0, 255), 25)
    pts1 = np.float32(biggest)
    pts2 = np.float32(
        [[0, 0], [widthImg, 0], [0, heightImg], [widthImg, heightImg]])
    matrix = cv2.getPerspectiveTransform(pts1, pts2)
    imgWarpColored = cv2.warpPerspective(img, matrix, (widthImg, heightImg))
    imgDetectedDigits = imgBlank.copy()
    imgWarpColored = cv2.cvtColor(imgWarpColored, cv2.COLOR_BGR2GRAY)

# Split the image and find each digit available
    imgSolvedDigits = imgBlank.copy()
    boxes = splitBoxes(imgWarpColored)
    # print(len(boxes))
    numbers = getPredection(boxes, model)
    print(numbers)
    imgDetectedDigits = displayNumbers(
        imgDetectedDigits, numbers, color=(255, 0, 255))
    numbers = np.asarray(numbers)
    posArray = np.where(numbers > 0, 0, 1)
    print(posArray)

# Find the solution
    board = np.array_split(numbers, 9)
    # print(board)
    try:
        Solve_Engine.solve(board)
    except:
        pass
    # print(board)
    flatList = []
    for sublist in board:
        for item in sublist:
            flatList.append(item)
    solvedNumbers = flatList * posArray
    imgSolvedDigits = displayNumbers(imgSolvedDigits, solvedNumbers)

# overlay solution
    pts2 = np.float32(biggest)
    pts1 = np.float32(
        [[0, 0], [widthImg, 0], [0, heightImg], [widthImg, heightImg]])
    matrix = cv2.getPerspectiveTransform(pts1, pts2)  # GER
    imgInvWarpColored = img.copy()
    imgInvWarpColored = cv2.warpPerspective(
        imgSolvedDigits, matrix, (widthImg, heightImg))
    inv_perspective = cv2.addWeighted(imgInvWarpColored, 1, img, 0.5, 1)
    imgDetectedDigits = drawGrid(imgDetectedDigits)
    imgSolvedDigits = drawGrid(imgSolvedDigits)

# imageArray = ([img, imgThreshold, imgContours, imgBigContour],
#                   [imgDetectedDigits, imgSolvedDigits, imgInvWarpColored, inv_perspective])
# stackedImage = stackImages(imageArray, 1)
# cv2.imshow('Stacked Images', stackedImage)
#
    output_path = os.path.join("images", "final3.jpg")
    cv2.imwrite(output_path, inv_perspective)

else:
    print("No Sudoku Found")

cv2.waitKey(0)
