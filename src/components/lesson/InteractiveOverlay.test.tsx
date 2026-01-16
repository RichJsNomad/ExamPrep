import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '../../test/test-utils'
import { InteractiveOverlay } from './InteractiveOverlay'
import type { InteractiveQuestion } from '../../types/video'

describe('InteractiveOverlay', () => {
  const mockQuestion: InteractiveQuestion = {
    id: 'q1',
    timestamp: 30,
    question: 'What is 2 + 2?',
    options: ['3', '4', '5', '6'],
    correctIndex: 1,
    xpReward: 15,
  }

  const mockOnAnswer = vi.fn()

  beforeEach(() => {
    mockOnAnswer.mockClear()
  })

  describe('rendering', () => {
    it('should render the question text', () => {
      render(<InteractiveOverlay question={mockQuestion} onAnswer={mockOnAnswer} />)

      expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument()
    })

    it('should render all answer options', () => {
      render(<InteractiveOverlay question={mockQuestion} onAnswer={mockOnAnswer} />)

      expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '4' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '6' })).toBeInTheDocument()
    })

    it('should display XP reward badge', () => {
      render(<InteractiveOverlay question={mockQuestion} onAnswer={mockOnAnswer} />)

      expect(screen.getByText('+15 XP за правильный ответ')).toBeInTheDocument()
    })

    it('should display default XP (10) when xpReward is not specified', () => {
      const questionWithoutXP: InteractiveQuestion = {
        ...mockQuestion,
        xpReward: undefined,
      }

      render(<InteractiveOverlay question={questionWithoutXP} onAnswer={mockOnAnswer} />)

      expect(screen.getByText('+10 XP за правильный ответ')).toBeInTheDocument()
    })

    it('should display instruction text', () => {
      render(<InteractiveOverlay question={mockQuestion} onAnswer={mockOnAnswer} />)

      expect(screen.getByText('Ответьте на вопрос, чтобы продолжить просмотр')).toBeInTheDocument()
    })
  })

  describe('user interactions', () => {
    it('should call onAnswer with correct params when correct answer is clicked', async () => {
      const user = userEvent.setup()
      render(<InteractiveOverlay question={mockQuestion} onAnswer={mockOnAnswer} />)

      await user.click(screen.getByRole('button', { name: '4' }))

      expect(mockOnAnswer).toHaveBeenCalledWith('q1', 1, true)
    })

    it('should call onAnswer with isCorrect=false when wrong answer is clicked', async () => {
      const user = userEvent.setup()
      render(<InteractiveOverlay question={mockQuestion} onAnswer={mockOnAnswer} />)

      await user.click(screen.getByRole('button', { name: '3' }))

      expect(mockOnAnswer).toHaveBeenCalledWith('q1', 0, false)
    })

    it('should call onAnswer with correct selectedIndex for each option', async () => {
      const user = userEvent.setup()
      const { rerender } = render(
        <InteractiveOverlay question={mockQuestion} onAnswer={mockOnAnswer} />
      )

      // Click first option
      await user.click(screen.getByRole('button', { name: '3' }))
      expect(mockOnAnswer).toHaveBeenCalledWith('q1', 0, false)

      mockOnAnswer.mockClear()
      rerender(<InteractiveOverlay question={mockQuestion} onAnswer={mockOnAnswer} />)

      // Click third option
      await user.click(screen.getByRole('button', { name: '5' }))
      expect(mockOnAnswer).toHaveBeenCalledWith('q1', 2, false)

      mockOnAnswer.mockClear()
      rerender(<InteractiveOverlay question={mockQuestion} onAnswer={mockOnAnswer} />)

      // Click fourth option
      await user.click(screen.getByRole('button', { name: '6' }))
      expect(mockOnAnswer).toHaveBeenCalledWith('q1', 3, false)
    })
  })

  describe('different question configurations', () => {
    it('should handle question with only 2 options', async () => {
      const user = userEvent.setup()
      const twoOptionQuestion: InteractiveQuestion = {
        id: 'q2',
        timestamp: 10,
        question: 'Is the sky blue?',
        options: ['Yes', 'No'],
        correctIndex: 0,
        xpReward: 5,
      }

      render(<InteractiveOverlay question={twoOptionQuestion} onAnswer={mockOnAnswer} />)

      expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument()
      expect(screen.queryByRole('button', { name: '3' })).not.toBeInTheDocument()

      await user.click(screen.getByRole('button', { name: 'Yes' }))
      expect(mockOnAnswer).toHaveBeenCalledWith('q2', 0, true)
    })

    it('should handle question with long option texts', () => {
      const longOptionQuestion: InteractiveQuestion = {
        id: 'q3',
        timestamp: 20,
        question: 'Which statement is correct?',
        options: [
          'This is a very long answer option that spans multiple words',
          'Another long answer option with lots of text content',
          'Short',
          'Medium length option',
        ],
        correctIndex: 2,
      }

      render(<InteractiveOverlay question={longOptionQuestion} onAnswer={mockOnAnswer} />)

      expect(
        screen.getByRole('button', {
          name: 'This is a very long answer option that spans multiple words',
        })
      ).toBeInTheDocument()
    })

    it('should handle question with special characters', () => {
      const specialCharQuestion: InteractiveQuestion = {
        id: 'q4',
        timestamp: 40,
        question: 'What is 5 × 3 ÷ 5?',
        options: ['1', '3', '5', '15'],
        correctIndex: 1,
      }

      render(<InteractiveOverlay question={specialCharQuestion} onAnswer={mockOnAnswer} />)

      expect(screen.getByText('What is 5 × 3 ÷ 5?')).toBeInTheDocument()
    })

    it('should handle zero xpReward (falls back to default 10)', () => {
      const zeroXPQuestion: InteractiveQuestion = {
        ...mockQuestion,
        xpReward: 0,
      }

      render(<InteractiveOverlay question={zeroXPQuestion} onAnswer={mockOnAnswer} />)

      // When xpReward is 0 (falsy), it falls back to default 10
      expect(screen.getByText('+10 XP за правильный ответ')).toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('should have all buttons accessible', () => {
      render(<InteractiveOverlay question={mockQuestion} onAnswer={mockOnAnswer} />)

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(4)
      buttons.forEach((button) => {
        expect(button).toBeEnabled()
      })
    })

    it('should render question as heading', () => {
      render(<InteractiveOverlay question={mockQuestion} onAnswer={mockOnAnswer} />)

      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toHaveTextContent('What is 2 + 2?')
    })
  })
})
