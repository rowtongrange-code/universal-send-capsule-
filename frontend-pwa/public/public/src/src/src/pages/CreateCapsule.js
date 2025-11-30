import React, {useState} from 'react'
import CapsuleForm from '../components/CapsuleForm'

export default function CreateCapsule(){
  return (
    <div>
      <h2>Create Capsule</h2>
      <p>Create an encrypted capsule and share it.</p>
      <CapsuleForm />
    </div>
  )
}
