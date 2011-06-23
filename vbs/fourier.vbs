'=============================================================================
' Script  : fourier.vbs
'=============================================================================
'
' Copyright 2010,2011 ABB Switzerland Ltd.
'
' Author         : O.Stollmann
' Creation date  : 06-APR-2011
' Version        : 1.00
' Latest Update  : 
'
' Purpose        : Functions to compute discrete Fourier Transform and it's
'                  inverse
'
' Notes          : function parameters x & s must be 2D arrays with the first
'                  element of the second dimension being the real part of the
'                  number and the second element the imaginary
'                  ex: 2-2i, 3-3i => x(0,0)=2, x(0,1)=-2, x(1,0)=3, x(1,1)=-3
'=============================================================================
' Modifications:
' Rev  Date        Who Description
' 1.00 06-APR-2004 OS  Created
'
'
'=============================================================================

''' TEST: uncomment the following line to test
testftaift
'''

' """ Discrete Fourier Transform """
Function ft(x)
  Dim pi : pi = 3.14159265358979323846
  Dim n : n = UBound(x)+1

  Dim fx() : ReDim fx(n-1,1)
  
  for k = 0 To n-1
    fxs_re = 0
    fxs_im = 0
    for n2 = 0 To n-1
       fxs_re = fxs_re + (x(n2,0)*Cos(2*Pi*k*n2/n) + x(n2,1)*Sin(2*Pi*k*n2/n))
       fxs_im = fxs_im + (x(n2,1)*Cos(2*Pi*k*n2/n) - x(n2,0)*Sin(2*Pi*k*n2/n))
    Next
    fx(k,0) = fxs_re
    fx(k,1) = fxs_im
  Next
  ft = fx
End Function


' """ Discrete Inverse Fourier Transform """
Function ift(s)
  Dim pi : pi = 3.14159265358979323846
  Dim n : n = UBound(s)+1
  
  Dim tx() : ReDim tx(n-1,1)
  
  for n2=0 To n-1
    txs_re = 0
    txs_im = 0
    for k = 0 To n-1
      txs_re = txs_re + (s(k,0)*Cos(2*Pi*k*n2/n) - s(k,1)*Sin(2*Pi*k*n2/n))
      txs_im = txs_im + (s(k,0)*Sin(2*Pi*k*n2/n) + s(k,1)*Cos(2*Pi*k*n2/n))
    Next    
    tx(n2,0) = txs_re/n
    tx(n2,1) = txs_im/n
  Next
  ift = tx
End Function

Sub testftaift()
  Dim x(4,1)
  x(0,0) = 1 : x(0,1) = -2
  x(1,0) = -2 : x(1,1) = 3
  x(2,0) = 3 : x(2,1) = -4
  x(3,0) = 4 : x(3,1) = 5
  x(4,0) = 5 : x(4,1) = -1

  s = ft(x)
  xr = ift(s)

  For i = 0 To UBound(x,1)
     p _
     "Time (original): (" & x(i,0) & ") + i*(" & x(i,1) & ")" & vbCrLf & _
     "Frequency: (" & s(i,0) & ") + i*(" & s(i,1) & ")" & vbCrLf & _
     "Time (inverse): (" & xr(i,0) & ") + i*(" & xr(i,1) & ")"
  Next
End Sub


' """ Easy print """
Sub p(s)
  wscript.echo s & vbCrLf
End Sub
