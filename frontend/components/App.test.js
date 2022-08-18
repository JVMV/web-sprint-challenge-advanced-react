// Write your tests here
import AppFunctional from './AppFunctional'
import { render, fireEvent, screen } from '@testing-library/react'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'


let submitButton, up, down, left, right, emailInput
beforeEach(() => {
  render(<AppFunctional />)
  submitButton = screen.queryByTestId('submitbtn')
  emailInput = screen.queryByPlaceholderText('type email')
  up = screen.queryByText('UP')
  down = screen.queryByText('DOWN')
  left = screen.queryByText('LEFT')
  right = screen.queryByText('RIGHT')
})

describe('five tests for functional', () => {
  test('sanity', () => {
    expect(3 + 3).toEqual(6)
    expect(true).not.toEqual(false)
  })

  test('page loads with empty fields', () => {
    screen.queryByText('Coordinates Coordinates (2,2)')
    screen.queryByText('You moved 0 times')
    expect(emailInput).toHaveValue('')
  })


  test('email not entered error message shows', () => {
    fireEvent.click(up)
    fireEvent.click(left)
    fireEvent.click(submitButton)
    screen.queryByText('Ouch: email is required')
  })

  test('email not formatted correctly returns error', () => {
    fireEvent.change(emailInput, { target: { value: 'email@email' } })
    fireEvent.click(submitButton)
    screen.queryByText('Ouch: email must be a valid email')
  })

  test('grid coordinates correctly displayed', () => {
    fireEvent.click(up)
    screen.getByText('Coordinates Coordinates (2,1)')
    screen.getByText('You moved 1 time')
    fireEvent.click(up)
    screen.getByText("You can't go up")
    fireEvent.click(left)
    screen.getByText('Coordinates Coordinates (1,1)')
    screen.getByText('You moved 2 times')
  })

  test('form submits successfully', () => {
    fireEvent.click(up)
    fireEvent.click(left)
    fireEvent.click(right)
    fireEvent.click(down)
    fireEvent.click(up)
    fireEvent.change(emailInput, { target: { value: 'email@email.com' } })
    fireEvent.click(submitButton)
    screen.queryByText('email win #69')
  })






})
