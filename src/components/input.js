import React, {useState, useEffect} from "react";
import Styles from "./input.module.scss";

const ListItem = ({id, emoji, name, clickCallback}) => (
    <div className={Styles.listItem} onClick={clickCallback}>
        <div className={Styles.emoji} id="listEmoji">{emoji}</div>
        <div className={Styles.name} id="listName">{name}</div>
    </div>
)

const Tag = ({emoji, name, removeCallback}) => (
    <div className={Styles.tagWrapper}>
        <div className={Styles.emoji} id="tagEmoji">{emoji}</div>
        <div className={Styles.name} id="tagName">{name}</div>
        <div className={Styles.remove} onClick={removeCallback}>
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.464 6.05605L6.46399 18.056" stroke="#AAAAAA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6.46399 6.05605L18.464 18.056" stroke="#AAAAAA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
    </div>
)


const Input = ({resultsCallback}) => {
    
    // 20

    const ingredients = [
        {
            id: 0,
            emoji: '🍎',
            name: `Apple`,
        },        
        {
            id: 8,
            emoji: '🥑',
            name: `Avocado`,
        },
        {
            id: 1,
            emoji: '🍌',
            name: `Banana`,
        },
        {
            id: 2,
            emoji: '🍞',
            name: `Bread`,
        },        
        {
            id: 10,
            emoji: '🥦',
            name: `Broccoli`,
        },
        {
            id: 17,
            emoji: '🥥',
            name: `Coconut`,
        },
        {
            id: 15,
            emoji: '🥕',
            name: `Carrot`,
        },
        {
            id: 23,
            emoji: '🧀',
            name: `Cheese`,
        },
        {
            id: 3,
            emoji: '🍫',
            name: `Chocolate`,
        },
        {
            id: 11,
            emoji: '🌽',
            name: 'Corn',
        },
        {
            id: 19,
            emoji: '🥒',
            name: 'Cucumber',
        },
        {
            id: 4,
            emoji: '🥚',
            name: `Eggs`,
        },
        {
            id: 20,
            emoji: '🍇',
            name: `Grape`,
        },
        {
            id: 5,
            emoji: '🍯',
            name: `Honey`,
        },
        {
            id: 14,
            emoji: '🍨',
            name: `Ice cream`,
        },
        {
            id: 13,
            emoji: '🍋',
            name: `Lemon`,
        },
        {
            id: 24,
            emoji: '🥬',
            name: `Lettuce`,
        },
        {
            id: 21,
            emoji: '🥭',
            name: `Mango`,
        },
        {
            id: 6,
            emoji: '🥛',
            name: `Milk`,
        },
        {
            id: 12,
            emoji: '🍄',
            name: `Mushroom`,
        },
        {
            id: 18,
            emoji: '🥜',
            name: `Peanut`
        },
        {
            id: 7,
            emoji: '🥔',
            name: `Potato`,
        },
        {
            id: 9,
            emoji: '🍅',
            name: `Tomato`,
        },
        {
            id: 16,
            emoji: '🍓',
            name: `Strawberry`,
        },
        {
            id: 22,
            emoji: '🍠',
            name: `Sweet Potato`
        }
    ];

    const [searchResults, setSearchResults] = useState(ingredients);
    const [dropdown, setDropdown] = useState(false);
    const [tags, setTags] = useState([]);
    
    useEffect(()=>{
        window.addEventListener("click", function(event) {
            if(event.target.id !== 'search') {
                setDropdown(false);
            }
        });
    },[]);

    const actualSearch = () => {
        return ingredients.filter(item => {
            return tags.filter((tag)=>{
                return tag.id === item.id
            }).length === 0
        });
    }

    const handleSearch = (e)=> {
        let search = e.target.value.toLowerCase();
        let filtered = actualSearch().filter((item)=>{
            return item.name.toLowerCase().includes(search);
        });
        if(filtered.length > 0) {
        setSearchResults(filtered);
        } else {
            setSearchResults([{id: -1, emoji: `😕`, name: `Can't find related items`}])
        }
    }

    const addTag = (id) => {
        let lookup = ingredients.filter((item)=>{
            return item.id === id
        })[0];
        setTags([...tags, lookup]);
        document.getElementById('search').value = "";
    }

    const removeTag = (id) => {
        let removedList = tags.filter((item)=>{
            return item.id !== id
        });
        setTags(removedList);
    }

    return (
    <>
    <div className={Styles.wrapper}>
        <input type={`text`} placeholder={`Enter an item and hit enter`} id="search" autoComplete="off" onClick={()=>{setSearchResults(actualSearch()); setDropdown(true);}} onChange={handleSearch} />
        {dropdown && <div className={Styles.dropdown}>
            {searchResults.map(val => {
                return (<ListItem emoji={val.emoji} name={val.name} key={val.id} clickCallback={() => { addTag(val.id) }} />)
            })}
        </div>}
    </div>
    <div className={Styles.queries}>
        {tags.length > 0 && tags.map(tag => {
            return (<Tag emoji={tag.emoji} name={tag.name} key={tag.id} removeCallback={() => { removeTag(tag.id) }} />)
        })}
    </div>
    <div className={`center-group margins--lg`}><button onClick={resultsCallback}><span>👌</span> Fetch me some recipes</button></div>
    </>
)
}

export default Input;