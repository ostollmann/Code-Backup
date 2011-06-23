namespace DualWall
{
    partial class MainForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.chooseImageLeftPathButton = new System.Windows.Forms.Button();
            this.chooseImageRightPathButton = new System.Windows.Forms.Button();
            this.imageLeftPathField = new System.Windows.Forms.TextBox();
            this.imageRightPathField = new System.Windows.Forms.TextBox();
            this.cancelButton = new System.Windows.Forms.Button();
            this.okButton = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // chooseImageLeftPathButton
            // 
            this.chooseImageLeftPathButton.Location = new System.Drawing.Point(34, 94);
            this.chooseImageLeftPathButton.Name = "chooseImageLeftPathButton";
            this.chooseImageLeftPathButton.Size = new System.Drawing.Size(81, 23);
            this.chooseImageLeftPathButton.TabIndex = 0;
            this.chooseImageLeftPathButton.Text = "Left Image...";
            this.chooseImageLeftPathButton.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            this.chooseImageLeftPathButton.UseVisualStyleBackColor = true;
            this.chooseImageLeftPathButton.Click += new System.EventHandler(this.chooseImageLeftPathButton_Click);
            // 
            // chooseImageRightPathButton
            // 
            this.chooseImageRightPathButton.Location = new System.Drawing.Point(34, 123);
            this.chooseImageRightPathButton.Name = "chooseImageRightPathButton";
            this.chooseImageRightPathButton.Size = new System.Drawing.Size(81, 23);
            this.chooseImageRightPathButton.TabIndex = 2;
            this.chooseImageRightPathButton.Text = "Right Image...";
            this.chooseImageRightPathButton.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            this.chooseImageRightPathButton.UseVisualStyleBackColor = true;
            this.chooseImageRightPathButton.Click += new System.EventHandler(this.chooseImageRightPathButton_Click);
            // 
            // imageLeftPathField
            // 
            this.imageLeftPathField.Location = new System.Drawing.Point(126, 96);
            this.imageLeftPathField.Name = "imageLeftPathField";
            this.imageLeftPathField.Size = new System.Drawing.Size(248, 20);
            this.imageLeftPathField.TabIndex = 1;
            // 
            // imageRightPathField
            // 
            this.imageRightPathField.Location = new System.Drawing.Point(126, 125);
            this.imageRightPathField.Name = "imageRightPathField";
            this.imageRightPathField.Size = new System.Drawing.Size(248, 20);
            this.imageRightPathField.TabIndex = 3;
            // 
            // cancelButton
            // 
            this.cancelButton.Location = new System.Drawing.Point(299, 180);
            this.cancelButton.Name = "cancelButton";
            this.cancelButton.Size = new System.Drawing.Size(75, 23);
            this.cancelButton.TabIndex = 5;
            this.cancelButton.Text = "Cancel";
            this.cancelButton.UseVisualStyleBackColor = true;
            this.cancelButton.Click += new System.EventHandler(this.cancelButton_Click);
            // 
            // okButton
            // 
            this.okButton.Location = new System.Drawing.Point(214, 180);
            this.okButton.Name = "okButton";
            this.okButton.Size = new System.Drawing.Size(75, 23);
            this.okButton.TabIndex = 4;
            this.okButton.Text = "OK";
            this.okButton.UseVisualStyleBackColor = true;
            this.okButton.Click += new System.EventHandler(this.okButton_Click);
            // 
            // label1
            // 
            this.label1.Location = new System.Drawing.Point(31, 19);
            this.label1.Margin = new System.Windows.Forms.Padding(0);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(343, 53);
            this.label1.TabIndex = 7;
            this.label1.Text = "This tool will take your two images and merge them into a single image that you c" +
                "an then set as your wallpaper. The images must be of the same resolution as your" +
                " individual displays.";
            this.label1.UseCompatibleTextRendering = true;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(37, 158);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(337, 13);
            this.label2.TabIndex = 8;
            this.label2.Text = "Note: the merge process may take a few seconds, please be patient...";
            // 
            // MainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(404, 217);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.okButton);
            this.Controls.Add(this.cancelButton);
            this.Controls.Add(this.imageRightPathField);
            this.Controls.Add(this.imageLeftPathField);
            this.Controls.Add(this.chooseImageRightPathButton);
            this.Controls.Add(this.chooseImageLeftPathButton);
            this.Name = "MainForm";
            this.Text = "DualWall";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button chooseImageLeftPathButton;
        private System.Windows.Forms.Button chooseImageRightPathButton;
        private System.Windows.Forms.TextBox imageLeftPathField;
        private System.Windows.Forms.TextBox imageRightPathField;
        private System.Windows.Forms.Button cancelButton;
        private System.Windows.Forms.Button okButton;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
    }
}

