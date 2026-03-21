"""AceStepGeniusLyricsSearch node for ACE-Step"""
import os
import sys
from lyricsgenius import Genius
from .includes.lyrics_utils import load_lyrics_from_disk, save_lyrics_to_disk

class AceStepGeniusLyricsSearch:
    """Fetch lyrics from Genius.com using their API based on specific artist/title.
    
    Inputs:
        artist_name (STRING): Artist to search for.
        song_title (STRING): Song to search for.
        save_lyrics (BOOLEAN): Save hit to local /lyrics cache.
        
    Outputs:
        lyrics (STRING): The raw lyrics.
    """
    
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "artist_name": ("STRING", {"default": "Flume"}),
                "song_title": ("STRING", {"default": "Say Nothing"}),
                "save_lyrics": ("BOOLEAN", {"default": True}),
            }
        }
    
    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("lyrics",)
    FUNCTION = "get_lyrics"
    CATEGORY = "Scromfy/Ace-Step/Lyrics"

    def get_lyrics(self, artist_name, song_title, save_lyrics=True):
        # Check cache first
        cached_lyrics = load_lyrics_from_disk(artist_name, song_title)
        if cached_lyrics:
            print(f"[GeniusSearch] Loading lyrics from cache for '{song_title}' by '{artist_name}'")
            return (cached_lyrics,)

        # Resolve path to the keys file
        base_dir = os.path.dirname(os.path.dirname(__file__))
        key_path = os.path.join(base_dir, "keys", "genius_api_key.txt")
        
        if not os.path.exists(key_path):
            error_msg = f"Genius API key not found at {key_path}. Please follow the instructions in keys/README.md"
            print(error_msg, file=sys.stderr)
            return (f"Error: {error_msg}",)
            
        try:
            with open(key_path, "r") as f:
                token = f.read().strip()
            
            if not token:
                return ("Error: Genius API token is empty.",)
                
            # Initialize Genius client
            genius = Genius(
                token,
                timeout=20,
                retries=3,
                remove_section_headers=False,
                verbose=False
            )
            
            # Search for the song
            print(f"[GeniusSearch] Searching Genius for '{song_title}' by '{artist_name}'...")
            song = genius.search_song(title=song_title, artist=artist_name)
            
            if song is None:
                return (f"No lyrics found for '{song_title}' by '{artist_name}' on Genius.",)
                
            lyrics = song.lyrics or ""
            
            if not lyrics.strip():
                return (f"Song found on Genius, but no lyrics were returned for '{song_title}' by '{artist_name}'.",)
                
            # Save to disk if requested
            if save_lyrics:
                save_lyrics_to_disk(artist_name, song_title, lyrics)
                print(f"[GeniusSearch] Saved lyrics to disk for '{song_title}' by '{artist_name}'")
            
            return (lyrics,)
            
        except Exception as e:
            error_msg = f"Error fetching lyrics from Genius: {str(e)}"
            print(error_msg, file=sys.stderr)
            return (f"Error: {error_msg}",)

NODE_CLASS_MAPPINGS = {
    "AceStepGeniusLyricsSearch": AceStepGeniusLyricsSearch,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "AceStepGeniusLyricsSearch": "Genius Lyrics Search",
}
