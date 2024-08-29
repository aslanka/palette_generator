import React, { useState } from 'react';
import chroma from 'chroma-js';
import Tippy from '@tippyjs/react';
import 'react-tippy/dist/tippy.css';

const PaletteGenerator = () => {
    const [palette, setPalette] = useState([]);
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedPalette, setSelectedPalette] = useState([]);

    const fetchPalette = async () => {
        setLoading(true); // Set loading to true before starting the request
        try {
            const response = await fetch(process.env.REACT_APP_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setPalette(data.colors);
            setSelectedPalette(data.colors);
        } catch (error) {
            console.error('Error fetching palette:', error);
        } finally {
            setLoading(false); // Set loading to false after the request is complete
        }
    };

    const enhancePrompt = () => {
        // Implement functionality to enhance the prompt
        console.log('Enhancing prompt:', prompt);
        // For example, you might want to modify the prompt or use a different API call
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2 className="title">Palette Theme Picker</h2>

            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="EX. Create a light, fun, and inviting color palette for a social media app. Use cheerful, soft, and vibrant colors that are easy on the eyes, ensuring the design feels playful and welcoming. Include a mix of light and slightly darker shades for visual balance and readability."
                rows="5"
                cols="40"
                style={{ padding: '10px', fontSize: '16px', width: '100%', marginBottom: '20px' }}
            />

            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
                {loading ? (
                    <div style={{ fontSize: '24px' }}>Loading...</div> // You can replace this with a spinner component if you have one
                ) : (
                    palette.length > 0 ? palette.map((color, index) => (
                        <div key={index} style={{ backgroundColor: color, width: '100px', height: '100px', borderRadius: '8px' }}>
                            <p style={{ color: chroma(color).luminance() < 0.5 ? '#fff' : '#000', padding: '35px 0', margin: '0', textAlign: 'center' }}>
                                {color}
                            </p>
                        </div>
                    )) : <p>Enter a prompt and click the button to generate.</p>
                )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <button onClick={fetchPalette} className="generateBtn" style={{ padding: '10px 20px', fontSize: '16px' }} disabled={loading}>
                    {loading ? 'Generating...' : 'Generate New Palette'}
                </button>

                <Tippy content="Upcoming Feature: Enhance your prompts to get better results!">
                    <button onClick={enhancePrompt} className="enhanceBtn" style={{ padding: '10px 20px', fontSize: '16px' }} disabled={loading}>
                        Enhance Prompt
                    </button>
                </Tippy>
            </div>

            <div style={{ marginTop: '20px', fontSize: '18px', padding: "40px"}}>
                <p><strong>Coming Soon:</strong> We will soon introduce features that allow you to provide feedback on the generated themes. Your feedback will help improve the model's responses and enhance your experience.</p>
            </div>
        </div>
    );
};

export default PaletteGenerator;
