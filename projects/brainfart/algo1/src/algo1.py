import operator
#import numpy as np


class Algo1:
	def __init__(self):
		self._prep()
		self._create_tag_list()
		self._run_for_each()
		
	def _prep(self):
		self.activities = [
			['movie', 'cinema', 'jessica alba', 'action', 'leonardo dicaprio', 'oliver stone', '2011', 'collin farell', 'directors cut'],
			['picasso', 'paintings', 'art', 'culture', 'museum', 'impressionism', '1960s', 'zurich', 'exposition'],
			['movie', 'leonardo dicaprio', 'cinema', 'drama', 'comedy', '2010', 'oscar', 'jennifer anniston', 'remake'],
			['van gogh', 'picasso', 'museum', 'art', 'culture', 'impressionism', 'modern art', '1950s', '1960s'],
			['tv', 'sport', 'bayern munich', 'werder bremen', 'soccer', 'bundesliga', 'finale', 'mirsolav klose', 'bastian schweinsteiger'],
			['cinema', 'charlie sheen', 'comedy', 'adam sandler', 'drugs', 'drama', 'horror', 'russell crowe', '3d'],
			['sport', 'soccer', 'bayern munich', 'fc barcelona', 'champions league', 'group phase', 'messi', 'bastian schweinsteiger', 'amazing'],
			['sport', 'olympics', '100m run', 'athlete', 'hussain bolt', 'gold medal', 'olympic games', 'bolt', 'fastest man'],
		]
		
		#self.master = ['movie', 'jessica alba', 'collin farell', 'leonardo dicaprio', 'comedy']
		self.master = ['soccer', 'tennis', 'bayern munich', 'tv', 'final', 'olympic games', 'champions league', 'jessica alba', 'cinema']
	
	def _run_for_each(self):
		for activity in self.activities:
			self.master = activity
			self._create_master_vector()
			self._create_existence_matrix()
			self._compare_to_master()
			self._print()
			self._print_result()
			
	
	def _print(self):
		print 'Master Vector:'
		print self.master_vector
		print 'Existence Matrix:'
		print self.existence_matrix
		print 'Similarity Vector:'
		print self.similarity_vector
	
	def _print_result(self):
		print 'Master: ' + str(self.master)
		similarity_vector = sorted(self.similarity_vector.iteritems(), key=operator.itemgetter(1), reverse=True)
		for activity_id, value in similarity_vector :
			print 'Similarity='+str(value)+' Activity: ' + str(self.activities[activity_id])

	def _create_tag_list(self):
		self.all_tags = []
		for tags in self.activities:
			for tag in tags:
				try:
					i = self.all_tags.index(tag)
				except ValueError:
					self.all_tags.append(tag)
	
	def _compare_to_master(self):
		self.similarity_vector = {}
		n = -1 # activity
		for activity in self.existence_matrix:
			n += 1
			m = -1 # tag
			similarity = 0
			for tag in self.all_tags:
				m +=1 
				if self.existence_matrix[n][m] == self.master_vector[m] and self.master_vector[m] == 1:
					similarity += 1
			self.similarity_vector[n] = similarity
			
		
	def _create_master_vector(self):
		self.master_vector = []
		for tag in self.all_tags:
				try:
					i = self.master.index(tag)
					# found
					self.master_vector.append(1)
				except ValueError:
					# not found
					self.master_vector.append(0)
	
	def _create_existence_matrix(self):
		self.existence_matrix = []
		n = -1
		m = -1
		for tags in self.activities:
			n += 1 #activity ID
			existence_vector = []
			for tag in self.all_tags:
				m += 1 #tag ID (from all_tags)
				try:
					i = tags.index(tag)
					# found
					existence_vector.append(1)
				except ValueError:
					# not found
					existence_vector.append(0)
					
			self.existence_matrix.append(existence_vector)
		
if __name__ == '__main__':
	algo1 = Algo1()
	
	
	
	
	
# ALL TAGS
# ['movie', 'cinema', 'jessica alba', 'action', 'leonardo dicaprio', 'picasso', 'paintings', 'art', 'culture', 'museum', 'drama', 'comedy', 'van gogh', 'tv', 'sport', 'bayern munich', 'real madrid', 'soccer', 'charlie sheen', 'adam sandler', 'fc barcelona', 'champions league', 'sports', 'olympics', '100m run', 'athlete', 'hussain bolt']