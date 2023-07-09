import React, {useEffect, useState} from 'react';
import data from "../components/db";
import axios from "axios";

function Layout(props) {
    const [product, setProduct] = useState([]);
    const [btnName, setBtnName] = useState('qoshish');
    const [disabled, setDisabled] = useState(false);
    const [successSend, setSuccessSend] = useState(true);
    const itemPrice = product.reduce((a, c) => a + c.price * c.count, 0)
    const totalPrice = itemPrice;
    const onAdd = (e) => {
        const exist = product.find((x) => x.id === e.id);
        if (exist) {
            setProduct(
                product.map((x) =>
                    x.id === e.id ? {...exist, count: exist.count + 1} : x)
            )
        } else {
            setProduct([...product, {...e, count: 1}])
        }
    };
    const onRemove = (e) => {
        const exist = product.find((x) => x.id === e.id);
        if (exist.count === 1) {
            setProduct(product.filter((x) => x.id !== e.id))
        } else {
            setProduct(product.map((x) =>
                x.id === e.id ? {...exist, count: exist.count - 1} : x
            ))

        }
    }
    const onChange = (e) => {
        console.log(`selected ${e}`);
    };

    const onSearch = (e) => {
        console.log('search:', e);
    };
    const Lavash = data.lavash.map((item) => {
        return (
            <div className="menu-item" >
                <img src={item.url} alt=""/>
                <h1>{item.name}</h1>
                <p>{item.price}</p>
                <button onClick={() => onAdd(item)}
                >{btnName}
                </button>
            </div>)
    });
    const Burger = data.burger.map((item) => {
        return (
            <div className="menu-item" >
                <img src={item.url} alt=""/>
                <h1>{item.name}</h1>
                <p>{item.price}</p>
                <button onClick={() => onAdd(item)}
                >{btnName}
                </button>
            </div>)
    });

    const Donar = data.donar.map((item) => {
        return (
            <div className="menu-item">
                <img src={item.url} alt=""/>
                <h1>{item.name}</h1>
                <p>{item.price}</p>
                <button onClick={() => onAdd(item)}
                >{btnName}
                </button>
            </div>)
    });
    const Hotdog = data.hotdog.map((item) => {
        return (
            <div className="menu-item">
                <img src={item.url} alt=""/>
                <h1>{item.name}</h1>
                <p>{item.price}</p>
                <button onClick={() => onAdd(item)}
                >{btnName}
                </button>
            </div>)
    });

    const Ovqat = data.ovqat.map((item) => {
        return (
            <div className="menu-item" >
                <img src={item.url} alt=""/>
                <h1>{item.name}</h1>
                <p>{item.price}</p>
                <button onClick={() => onAdd(item)}
                >{btnName}
                </button>
            </div>)
    });
    const Ichimlik = data.ichimlik.map((item) => {
        return (
            <div className="menu-item" >
                <img src={item.url} alt=""/>
                <h1>{item.name}</h1>
                <p>{item.price}</p>
                <button onClick={() => onAdd(item)}
                >{btnName}
                </button>
            </div>)
    });

    const show = product.map((item, index) => {

        return (
            <div className='show' key={index}>
                <div className="show-left">
                    <h1>{item.name}</h1>
                    <h1>{(item.price * item.count)} so'm</h1>
                </div>
                <div className="show-right">
                    <div className="buttons">
                        <button onClick={() => onAdd(item)} className={"btnPlus"}>+</button>
                        <input type="tel" value={item.count}/>
                        {/*<input type="tel" value={product[product.length-1].count} onChange={handleChange}/>*/}
                        <button onClick={() => onRemove(item)} className={"btnMinus"}>-</button>
                    </div>
                </div>
            </div>)
    })

    const sendData = () => {
        setDisabled(true)
        setTimeout(() => {
            setDisabled(false)
        }, 4000)
        let select = document.getElementById('s');
        let errorContent = document.getElementById('error_content');
        let errorBox = document.querySelector('.error-msg');
        if (select.value === "0") {
            errorContent.innerHTML = "O'tirgan stolingizni tallang!!";
            errorBox.style.display = 'flex'
            errorBox.style.background = 'rgba(255,0,0, 0.7)';
            setTimeout(() => {
                errorContent.innerHTML = "";
                errorBox.style.display = 'none'
            }, 4000)
        } else {
            if (product.length === 0) {
                errorContent.innerHTML = "Maxsulot talanmadi!!";
                errorBox.style.display = 'flex'
                errorBox.style.background = 'rgba(255,0,0, 0.7)';
                setTimeout(() => {
                    errorContent.innerHTML = "";
                    errorBox.style.display = 'none'
                }, 4000)

            } else {
                let msg = "<b>Buyurtma qilindi: </b> \n";
                msg += product.map((item) => item.name + " :  " + item.count + "ta  " + item.price * item.count + "so'm" + "\n");
                msg += "\n Stol raqami: " + select.value;
                msg += "\n Jami: " + totalPrice + "  so'm";
                return sendToAPI(msg)
            }
        }
    }
    const sendToAPI = (massage) => {
        let errorContent = document.getElementById('error_content');
        let errorBox = document.querySelector('.error-msg');
        const TOKEN = "6154720469:AAEuens5dKzdhJ7sjkCyclgPjEfVhXgt3wk";
        const CHATID = "-1001826706825";
        try {
            axios.post("https://api.telegram.org/bot" + TOKEN + "/sendMessage", {
                chat_id: CHATID,
                parse_mode: 'html',
                text: massage
            }).then((res) => {
                    errorBox.style.display = 'flex'
                    errorBox.style.background = 'green';
                    errorContent.innerHTML = "Buyurtmangiz qabul qilindi";
                    setTimeout(() => {
                        window.location.reload(false)

                        errorBox.style.display = 'none';
                        errorContent.innerHTML = "";
                        errorBox.style.background = 'rgba(255,0,0, 0.7)';
                    }, 4000)
                }
            )
        } catch (error) {
            if (error) {
                errorContent.innerHTML = "Tizimda xatolik !!";
                errorBox.style.display = 'flex';
                errorBox.style.background = 'rgba(255,0,0, 0.7)';
                setTimeout(() => {
                    errorContent.innerHTML = "";
                    errorBox.style.display = 'none'
                }, 4000)
            }
        }
    };

    return (
        <>
            <div className="error-msg">
                <h1 id={'error_content'}></h1>
            </div>
            <header>
                <nav>
                    <ul>
                        <li><a href="#lavash">Lavash</a></li>
                        <li><a href="#burger">Burger</a></li>
                        <li><a href="#donar">Donar</a></li>
                        <li><a href="#hotdog">Hotdog</a></li>
                        <li><a href="#ovqat">Ovqat</a></li>
                        <li><a href="#ichimlik">Ichimliklar</a></li>
                    </ul>
                </nav>

            </header>
            <div className={'content'}>

                <div className="menu-content">
                    <div className="menu-content-box">
                        <section id={'lavash'}>
                            <h1 className="title">Lavash</h1>
                            {Lavash}
                        </section>
                        <section id={'burger'}>
                            <h1 className="title">Burger</h1>

                            {Burger}
                        </section>
                        <section id={'donar'}>
                            <h1 className="title">Donar</h1>

                            {Donar}
                        </section>
                        <section id={'hotdog'}>
                            <h1 className="title">Hotdog</h1>

                            {Hotdog}
                        </section>
                        <section id={'ovqat'}>
                            <h1 className="title">Ovqat</h1>

                            {Ovqat}
                        </section>
                        <section id={'ichimlik'}>
                            <h1 className="title">Ichimlik</h1>

                            {Ichimlik}
                        </section>
                    </div>
                </div>
                <aside>
                    <div className="logo">
                        <a href="#">
                            <img src={require('../assets/img/tantuni png.png')} alt=""/>
                        </a>
                    </div>
                    <span>=======================================</span>
                    <div className="check-content">
                        <select id={'s'}>
                            <option value="0">Stolni tallang:</option>
                            <option value="1">1-stol</option>
                            <option value="2">2-stol</option>
                            <option value="3">3-stol</option>
                            <option value="4">4-stol</option>
                            <option value="5">5-stol</option>
                            <option value="6">6-stol</option>
                            <option value="7">7-stol</option>
                            <option value="8">8-stol</option>
                            <option value="9">9-stol</option>
                            <option value="10">10-stol</option>
                            <option value="11">11-stol</option>
                            <option value="12">12-stol</option>
                        </select>
                        <div className="title-check">Siznning Buyurtmangiz</div>

                        <div className="check-product">
                            {show}
                        </div>
                        <div className="totalAndPay">
                            <span>=======================================</span>
                            <div className="total"><h1>Jami:{totalPrice} so'm</h1></div>
                            <button onClick={sendData} disabled={disabled} className={'buttonPay'}>Buyurtma berish
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        </>
    );
}

export default Layout;
