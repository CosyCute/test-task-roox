import { useState, useEffect, FocusEventHandler } from 'react';
import { useParams } from 'react-router-dom';
import { IAddressProfile, IUserProfile } from '../../types/users'
import './UserProfile.scss'

interface IProps {
    users: IUserProfile[]
}

interface IForm {
    name: number;
    username: string;
    email: string;
    phone: string;
    website: string;
    address: IAddressProfile;
    comment: string;
}

const UserProfile = (props: IProps) => {

    const params = useParams()

    const [inputReadOnly, setInputReadOnly] = useState<boolean>(true)

    const user = props.users.filter(x => x.id.toString() === params.id)[0] as IUserProfile;

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        (document.getElementById(event.target.id) as HTMLInputElement).value = event.target.value;
    }

    const submitForm = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        let tar = (e.target as HTMLFormElement);

        let address: IAddressProfile = {
            street: tar.street.value,
            city: tar.city.value,
            zipcode: tar.zipcode.value,
        }

        let result: IForm = {
            name: tar.Name.value,
            username: tar.username.value,
            email: tar.email.value,
            phone: tar.phone.value,
            website: tar.website.value,
            address: address,
            comment: tar.comment.value,
        }
        console.log(result)
    }

    useEffect(() => {
        let inputs: HTMLCollectionOf<HTMLInputElement> = document.getElementsByTagName('input')
        for (let i = 0; i < inputs.length; i++)
            inputs[i].readOnly = inputReadOnly;
    })

    const [emailValidation, setEmailValidation] = useState<boolean>(false)
    const [websiteValidation, setWebsiteValidation] = useState<boolean>(false)

    const emailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (!(e.target.value.includes('@') && e.target.value.includes('.'))) setEmailValidation(true);
        else setEmailValidation(false)
    }

    const websiteBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (!e.target.value.includes('.')) setWebsiteValidation(true);
        else setWebsiteValidation(false)
    }

    return (
        <div className="user-profile">
            <div className='header'>
                <h2>User profile</h2>
                <button onClick={() => setInputReadOnly(false)} type="button">Edit</button>
            </div>
            <form onSubmit={submitForm}>
                <div className='info-block'>
                    <div className='info-block-item'>
                        <h3>Main info: </h3>
                        <div>
                            <span>Name: </span>
                            <input onChange={changeHandler} id="Name" defaultValue={user.name} />
                        </div>
                        <div>
                            <span>Username: </span>
                            <input onChange={changeHandler} id="username" defaultValue={user.username} />
                        </div>
                        <div>
                            <span>Email: </span>
                            <input type="email" onBlur={(e) => emailBlur(e)} onChange={changeHandler} id="email" defaultValue={user.email} />
                            {emailValidation ? <div className='validationMessage'>Incorrect email</div> : <></>}
                        </div>
                        <div>
                            <span>Phone: </span>
                            <input type="tel" onChange={changeHandler} id="phone" defaultValue={user.phone} />
                        </div>
                        <div>
                            <span>Website: </span>
                            <input onBlur={(e) => websiteBlur(e)} onChange={changeHandler} id="website" defaultValue={user.website} />
                            {websiteValidation ? <div className='validationMessage'>Incorrect website</div> : <></>}
                        </div>
                        <div className='comment'>
                            <div>
                                <span>Comment: </span>
                                <textarea id="comment" rows={5} cols={10} name="text"></textarea>
                            </div>
                            <button type='submit'>Send</button>
                        </div>
                    </div>
                    <div className='info-block-item'>
                        <h3>Address info:</h3>
                        <div>
                            <span>Street: </span>
                            <input onChange={changeHandler} id="street" defaultValue={user.address.street} />
                        </div>
                        <div>
                            <span>City: </span>
                            <input onChange={changeHandler} id="city" defaultValue={user.address.city} />
                        </div>
                        <div>

                            <span>Zipcode: </span>
                            <input onChange={changeHandler} id="zipcode" defaultValue={user.address.zipcode} />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UserProfile;