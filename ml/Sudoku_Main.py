import base64
import os
from Utility_Func import *
import Solve_Engine
import cv2
import numpy as np


def solve_sudoku_from_image(image_base64):
    try:
        # output_path = os.path.join("images", "input.jpg")
        # cv2.imwrite(output_path, image)
        heightImg = 450
        widthImg = 450
        model = intializePredectionModel()

        # Prepare the Image
        # Decode base64 rstring to image
        image_data = base64.b64decode(image_base64)
        nparr = np.frombuffer(image_data, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        cv2.imwrite("0.jpg", img)
        img = cv2.resize(img, (widthImg, heightImg))
        imgBlank = np.zeros((heightImg, widthImg, 3), np.uint8)
        imgThreshold = preProcess(img)
        cv2.imwrite("1.jpg", imgThreshold)

        # Find Contours
        imgContours = img.copy()
        imgBigContour = img.copy()
        contours, hierarchy = cv2.findContours(
            imgThreshold, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        cv2.drawContours(imgContours, contours, -1, (0, 0, 255), 3)
        cv2.imwrite("2.jpg", imgContours)

        # Find the biggest Contour
        biggest, maxArea = biggestContour(contours)

        if biggest.size != 0:
            biggest = reorder(biggest)
            cv2.drawContours(imgBigContour, biggest, -1, (0, 0, 255), 25)
            pts1 = np.float32(biggest)
            pts2 = np.float32(
                [[0, 0], [widthImg, 0], [0, heightImg], [widthImg, heightImg]])
            matrix = cv2.getPerspectiveTransform(pts1, pts2)
            imgWarpColored = cv2.warpPerspective(
                img, matrix, (widthImg, heightImg))
            imgDetectedDigits = imgBlank.copy()
            imgWarpColored = cv2.cvtColor(imgWarpColored, cv2.COLOR_BGR2GRAY)
            cv2.imwrite("3.jpg", imgWarpColored)

            # Split the image and find each digit available
            imgSolvedDigits = imgBlank.copy()
            boxes = splitBoxes(imgWarpColored)
            numbers = getPredection(boxes, model)

            imgDetectedDigits = displayNumbers(
                imgDetectedDigits, numbers, color=(255, 0, 255))
            numbers = np.asarray(numbers)
            posArray = np.where(numbers > 0, 0, 1)

            # Find the solution
            board = np.array_split(numbers, 9)
            try:
                Solve_Engine.solve(board)
            except:
                pass
            flatList = []
            for sublist in board:
                for item in sublist:
                    flatList.append(item)
            solvedNumbers = flatList * posArray
            imgSolvedDigits = displayNumbers(imgSolvedDigits, solvedNumbers)
            cv2.imwrite("4.jpg", imgSolvedDigits)

            # overlay solution
            pts2 = np.float32(biggest)
            pts1 = np.float32(
                [[0, 0], [widthImg, 0], [0, heightImg], [widthImg, heightImg]])
            matrix = cv2.getPerspectiveTransform(pts1, pts2)
            imgInvWarpColored = img.copy()
            imgInvWarpColored = cv2.warpPerspective(
                imgSolvedDigits, matrix, (widthImg, heightImg))
            inv_perspective = cv2.addWeighted(
                imgInvWarpColored, 1, img, 0.5, 1)
            imgDetectedDigits = drawGrid(imgDetectedDigits)
            imgSolvedDigits = drawGrid(imgSolvedDigits)

            output_path = os.path.join("images", "final.jpg")
            cv2.imwrite(output_path, inv_perspective)

            return inv_perspective
        else:
            return None
    except Exception as e:
        print("Error:", str(e))
        return None
