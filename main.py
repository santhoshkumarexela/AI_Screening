
import streamlit as st
import streamlit.components.v1 as components
import os
import json

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
    .block-container {padding: 0px; margin: 0px; max-width: 100%;}
    iframe {display: block; width: 100vw; height: 100vh; border: none;}
    /* Remove padding that Streamlit adds by default */
    [data-testid="stAppViewBlockContainer"] {
        padding: 0;
    }
    </style>
""", unsafe_allow_html=True)

def load_app():
    # Attempt to get the API Key from Streamlit Secrets or Environment Variables
    api_key = st.secrets.get("API_KEY") or os.environ.get("API_KEY") or ""
    
    if not api_key:
        st.warning("⚠️ API_KEY not found in Streamlit Secrets. The AI features will not work. Please add it in Settings > Secrets.")

    try:
        if os.path.exists("index.html"):
            with open("index.html", "r", encoding="utf-8") as f:
                html_content = f.read()
            
            # Inject the API Key into the HTML using JSON encoding for safety.
            # We replace the placeholder string.
            safe_api_key = json.dumps(api_key)
            html_content = html_content.replace('__API_KEY_PLACEHOLDER__', safe_api_key)
            
            # Use components.html to render the React application
            components.html(html_content, height=1200, scrolling=True)
        else:
            st.error("❌ index.html not found in the root directory. Please check your file structure.")
    except Exception as e:
        st.error(f"❌ Error loading application: {str(e)}")

if __name__ == "__main__":
    load_app()
