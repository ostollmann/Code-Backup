using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;
using System.IO;
using System.Threading;
using System.Runtime.InteropServices;
using Microsoft.Win32;

namespace DualWall
{
    public partial class MainForm : Form
    {
        private string _leftImagePath = null;
        private string _rightImagePath = null;
        
        private ProgressBox pb;

        [DllImport("user32.dll", CharSet=CharSet.Auto)]
        static extern int SystemParametersInfo(int uAction, int uParam, string IpvParam, int fuWinIni);

        public MainForm()
        {
            InitializeComponent();
        }

        private void chooseImageLeftPathButton_Click(object sender, EventArgs e)
        {
            _leftImagePath = _chooseImageFile("Please choose the left image...");
            if (_leftImagePath == null)
                return;

            imageLeftPathField.Text = _leftImagePath;

        }

        private void chooseImageRightPathButton_Click(object sender, EventArgs e)
        {
            _rightImagePath = _chooseImageFile("Please choose the right image...");
            if (_rightImagePath == null)
                return;

            imageRightPathField.Text = _rightImagePath;

        }

        private void cancelButton_Click(object sender, EventArgs e)
        {
            Environment.Exit(0);
        }

        private void okButton_Click(object sender, EventArgs e)
        {
            if (_rightImagePath == null || _leftImagePath == null)
            {
                MessageBox.Show("Please choose both a left and a right image!");
                return;
            }
            _process();
        }

        private string _chooseImageFile(string title)
        {
            OpenFileDialog ofd = new OpenFileDialog();
            ofd.Title = title;
            ofd.Filter = "Image Files (*.bmp;*.jpg;*.gif;*.png)|*.BMP;*.JPG;*.GIF";
            if (ofd.ShowDialog() == DialogResult.OK)
                return ofd.FileName;
            else
                return null;
        }

        private void _process()
        {

            Bitmap lImage;
            Bitmap rImage;

            try
            {
                lImage = new Bitmap(_leftImagePath);
                rImage = new Bitmap(_rightImagePath);
            }
            catch (OutOfMemoryException)
            {
                MessageBox.Show("Could not open image files: out of memory!");
                return;
            }
            catch (FileNotFoundException)
            {
                MessageBox.Show("Could not open image files: file not found!");
                return;
            }
            catch (Exception)
            {
                MessageBox.Show("Could not open image file!");
                return;
            }



            Rectangle screen = SystemInformation.VirtualScreen;

            if (lImage.Width != (screen.Width / 2) || lImage.Height != screen.Height)
            {
                MessageBox.Show(string.Format("The resolution ({0}x{1}) of your left image is not right! It should be {2}x{3}", lImage.Width, lImage.Height, screen.Width/2, screen.Height));
                return;
            }
            if (rImage.Width != (screen.Width / 2) || rImage.Height != screen.Height)
            {
                MessageBox.Show(string.Format("The resolution ({0}x{1}) of your right image is not right! It should be {2}x{3}", rImage.Width, rImage.Height, screen.Width/2, screen.Height));
                return;
            }

            Bitmap nImage = new Bitmap(screen.Width, screen.Height);

            nImage = _merge(lImage, rImage, nImage);

            MessageBox.Show("Successfully created your new wallpaper. Please choose where to save it now...");
            string saveImagePath = null;
            int k = 0;
            while (saveImagePath == null)
            {
                if (k == 2)
                    return;

                k++;
                saveImagePath = _saveAs();
            }
            nImage.Save(saveImagePath);
            //_setWallpaper(saveImagePath);
            MessageBox.Show("You may now set your new wallpaper in the Control Panel. Enjoy!");
            this.Close();
        }

        private Bitmap _merge(Bitmap lImage, Bitmap rImage, Bitmap nImage)
        {
            for (int i = 0; i < nImage.Height; i++) // height
            {
                for (int j = 0; j < nImage.Width; j++) // width
                {
                    if (j < (lImage.Width)) // must be inversed...stupid windows!
                        nImage.SetPixel(j, i, rImage.GetPixel(j, i));
                    else
                        nImage.SetPixel(j, i, lImage.GetPixel(j - lImage.Width, i));
                }
            }
            return nImage;
        }

        private string _saveAs()
        {
            SaveFileDialog sfd = new SaveFileDialog();
            sfd.Filter = "JPEG Image|*.jpg|PNG Image|*.png|GIG Image|*.gif|Bitmap Image|*.bmp";
            sfd.Title = "Please choose a location to save your new wallpaper...";
            if (sfd.ShowDialog() == DialogResult.OK)
                return sfd.FileName;
            else
                return null;
        }

        private void _setWallpaper(string path)
        {
            SystemParametersInfo(20, 0, path, 0x01 | 0x02);
            RegistryKey rWPP = Registry.CurrentUser.OpenSubKey("Control Panel\\Desktop", true);
            rWPP.SetValue("WallpaperStyle", 2);
            rWPP.SetValue("TileWallpaper", 0);
            rWPP.Close();
        }
    }
}
