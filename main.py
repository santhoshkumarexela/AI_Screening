
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

# Hide Streamlit UI elements for a cleaner look
st.markdown("""
    <style>
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}
    .block-container {padding: 0px;}
    iframe {display: block; width: 100vw; height: 100vh; border: none;}
    </style>
""", unsafe_allow_html=True)

def load_app():
    # Attempt to get the API Key from Streamlit Secrets or Environment Variables
    api_key = st.secrets.get("API_KEY") or os.environ.get("API_KEY") or ""
    
    try:
        if os.path.exists("index.html"):
            with open("index.html", "r", encoding="utf-8") as f:
                html_content = f.read()
            
            # Inject the API Key into the HTML so the JS can access it
            # We replace a placeholder in the HTML file
            html_content = html_content.replace('process.env.API_KEY', f"'{api_key}'")
            
            # Use components.html with a large height to prevent scrolling issues
            components.html(html_content, height=1200, scrolling=True)
        else:
            st.error("index.html not found. Please ensure the file exists in your repository.")
    except Exception as e:
        st.error(f"Error loading application: {str(e)}")

if __name__ == "__main__":
    load_app()
