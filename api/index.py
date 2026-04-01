from datetime import datetime

from flask import Flask, render_template

app = Flask(__name__,template_folder='templates',static_folder='static')

portfolio = {
    "name": "Aniket Gupta",
    "role": "Aspiring Machine Learning Engineer | Full Stack Developer",
    "tagline": "I combine machine learning and full-stack development to build practical, data-driven applications.",
    "location": "Mumbai, India",
    "email": "ag9326107@gmail.com",
    "profile_image": "image/Aniket image.png",

    "highlights": [
        "Machine Learning (EDA, Feature Engineering, Model Building)",
        "Full-stack development using Flask ",
        "Data analysis & visualization (Pandas, Seaborn, Matplotlib)"
    ],

    "stats": [
        {"label": "CGPA", "value": "9.25"},
        {"label": "ML Projects", "value": "1+"},
        {"label": "Full Stack Projects", "value": "3+"},
        {"label": "Core Stack", "value": "Python + ML + Flask"}
    ],

    "skills": [
        "Python",
        "Pandas",
        "NumPy",
        "Scikit-learn",
        "Matplotlib",
        "Seaborn",
        "SQL",
        "Flask",
        "Django",
        "HTML",
        "CSS",
        "JavaScript",
        "Git & GitHub"
    ],

    "projects": [
        {
            "title": "Titanic Survival Prediction",
            "description": "Built a machine learning model to predict passenger survival using feature engineering and classification techniques.",
            "features": [
                "Data cleaning and preprocessing",
                "EDA and visualization",
                "Feature engineering (Title, AgeGroup, FamilySize)",
                "Logistic Regression model (~80% accuracy)"
            ],
            "stack": ["Python", "Pandas", "Seaborn", "Scikit-learn"],
            "link": "https://github.com/ANIKET-DEV1/titanic-survival-prediction"
        },
            {
            "title": "Datalab",
            "description": "A full-stack data analysis platform to upload, clean, and visualize CSV datasets with preprocessing and interactive charts.",
            "features": [
                "Data cleaning (missing values, transformations)",
                "Visualization: bar, histogram, scatter, line, box plots",
                "User authentication system",
                "Dataset export functionality"
            ],
            "stack": ["Django", "Python", "Pandas", "Seaborn", "Matplotlib"],
            "link": "https://datalab-efsb.onrender.com/"
        },
        {
            "title": "ExpenseFlow",
            "description": "A financial tracking web app to manage expenses, debts, and categorized transactions.",
            "features": [
                "Expense & debt tracking modules",
                "Custom transaction tagging",
                "MySQL database integration",
                "Responsive UI with Flask backend"
            ],
            "stack": ["Flask", "Python", "MySQL"],
            "link": "https://aniket123.pythonanywhere.com/"
        },
        {
            "title": "Personal Portfolio",
            "description": "A minimalist dark portfolio with smooth animations, premium interactions, and responsive Flask-powered sections.",
            "features": [
                "Modern dark UI with glassmorphism feel",
                "Smooth loading, reveal, and navbar animations",
                "Responsive design with contact and project showcases",
                "Built using Flask, HTML, CSS, and JavaScript"
            ],
            "stack": ["Flask", "HTML", "CSS", "JavaScript"],
            "link": "#home"
        }
    ],

    "education": {
        "degree": "B.Tech in Artificial Intelligence & Data Science",
        "college": "Thakur College of Engineering and Technology",
        "year": "2024 – Present",
    },

    "links": {
        "github": "https://github.com/ANIKET-DEV1",
        "linkedin": "https://www.linkedin.com/in/aniket-gupta-57378b326/",
        "hackerrank": "https://www.hackerrank.com/profile/ag9326107",
        "leetcode": "https://leetcode.com/u/AwsmX/",
        "kaggle": "https://www.kaggle.com/awesomeaniket",
    }
}

@app.route('/')
def index():
    return render_template('index.html',portfolio=portfolio,year=datetime.now().year)


app.debug=True
