import cv2
import numpy as np
from Sudoku_Main import solve_sudoku_from_image
import base64
import streamlit as st


def solve_sudoku(image_base64):
    try:
        # Process the image using solve_sudoku_from_image function
        solved_sudoku_image = solve_sudoku_from_image(image_base64)

        if solved_sudoku_image is not None:
            # Convert the solved Sudoku image to base64
            _, solved_image_encoded = cv2.imencode(".png", solved_sudoku_image)
            solved_image_base64 = base64.b64encode(
                solved_image_encoded).decode('utf-8')
            return solved_image_base64
        else:
            st.error("No Sudoku Found")
            return None
    except Exception as e:
        st.error(str(e))
        return None


def main():
    st.title("Sudoku Solver with Streamlit")

    uploaded_file = st.file_uploader("Upload an image", type=[
                                     "jpg", "jpeg", "png", "webp"])

    if uploaded_file is not None:
        # Convert the image to base64
        image_bytes = uploaded_file.read()
        image_base64 = base64.b64encode(image_bytes).decode('utf-8')

        # Display the uploaded image
        st.image(uploaded_file, caption="Uploaded Image",
                 use_column_width=True)

        # Solve Sudoku
        solved_image_base64 = solve_sudoku(image_base64)

        if solved_image_base64 is not None:
            # Display the solved Sudoku image
            st.image(base64.b64decode(solved_image_base64),
                     caption="Solved Sudoku", use_column_width=True)


if __name__ == '__main__':
    main()
