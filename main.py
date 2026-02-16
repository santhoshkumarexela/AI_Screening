
import streamlit as st
import streamlit.components.v1 as components
import os

# Set up the Streamlit page
st.set_page_config(
    page_title="HirePulse AI - Intelligent Screening",
    page_icon="🎯",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Hide Streamlit header and footer for a pure app experience
hide_st_style = """
            <style>
            #MainMenu {visibility: hidden;}
            footer {visibility: hidden;}
            header {visibility: hidden;}
            .block-container {padding: 0px;}
            iframe {display: block; width: 100vw; height: 100vh; border: none;}
            </style>
            """
st.markdown(hide_st_style, unsafe_allow_html=True)

# Function to load the React application
def load_app():
    try:
        if os.path.exists("index.html"):
            with open("index.html", "r", encoding="utf-8") as f:
                html_content = f.read()
            
            # Inject the React application into the Streamlit page
            components.html(html_content, height=1000, scrolling=True)
        else:
            st.error("Error: index.html not found. Please ensure all project files are in the root directory.")
    except Exception as e:
        st.error(f"An error occurred: {e}")

if __name__ == "__main__":
    load_app()
