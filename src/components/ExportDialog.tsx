import { useEffect, useRef } from 'react'
import styles from './ExportDialog.module.css'

interface ExportDialogProps {
  fileName: string
  onFileNameChange: (value: string) => void
  onConfirm: () => void
  onCancel: () => void
}

export function ExportDialog({ fileName, onFileNameChange, onConfirm, onCancel }: ExportDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
    inputRef.current?.select()
  }, [])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onCancel])

  const trimmed = fileName.trim()

  return (
    <div className={styles.backdrop} onClick={onCancel}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (trimmed) onConfirm()
          }}
        >
          <p className={styles.title}>Export PDF</p>
          <p className={styles.subtitle}>Choose a file name for your CV.</p>
          <input
            ref={inputRef}
            className={styles.input}
            value={fileName}
            onChange={(e) => onFileNameChange(e.target.value)}
          />
          <p className={styles.suffix}>Saved as {trimmed || 'resume'}{trimmed.toLowerCase().endsWith('.pdf') ? '' : '.pdf'}</p>
          <div className={styles.actions}>
            <button type="button" className={styles.cancelButton} onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className={styles.confirmButton} disabled={!trimmed}>
              Export
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
